const ONE_DAY_SECONDS = 24 * 60 * 60;
const memoryStore = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  if (typeof realIp === "string" && realIp.length > 0) {
    return realIp.trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function getDailyKey(ip) {
  return `contact:${ip}:${new Date().toISOString().slice(0, 10)}`;
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function parseCookies(cookieHeader) {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const [name, ...valueParts] = cookie.trim().split("=");

    if (!name) {
      return cookies;
    }

    cookies[name] = decodeURIComponent(valueParts.join("="));
    return cookies;
  }, {});
}

function hasDailyCookie(req) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies.contact_sent_date === getToday();
}

function setDailyCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `contact_sent_date=${getToday()}; Max-Age=${ONE_DAY_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`
  );
}

function cleanupMemoryStore() {
  const now = Date.now();

  for (const [key, value] of memoryStore.entries()) {
    if (value.expiresAt <= now) {
      memoryStore.delete(key);
    }
  }
}

async function hasReachedDailyLimit(key) {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const response = await fetch(`${process.env.KV_REST_API_URL}/get/${encodeURIComponent(key)}`, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo validar el limite diario.");
    }

    const data = await response.json();
    return Boolean(data.result);
  }

  cleanupMemoryStore();
  return memoryStore.has(key);
}

async function markDailyLimit(key) {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const response = await fetch(`${process.env.KV_REST_API_URL}/set/${encodeURIComponent(key)}/1?EX=${ONE_DAY_SECONDS}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo guardar el limite diario.");
    }

    return;
  }

  memoryStore.set(key, {
    expiresAt: Date.now() + ONE_DAY_SECONDS * 1000,
  });
}

function validatePayload(body) {
  const fromName = String(body?.from_name || "").trim();
  const fromEmail = String(body?.from_email || "").trim();
  const message = String(body?.message || "").trim();

  if (!fromName || !fromEmail || !message) {
    return { error: "Completa nombre, email y mensaje." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
    return { error: "Ingresa un email valido." };
  }

  return {
    value: {
      clientName: fromName,
      from_name: fromName,
      from_email: fromEmail,
      message,
    },
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Metodo no permitido." });
  }

  try {
    const validation = validatePayload(req.body);

    if (validation.error) {
      return res.status(400).json({ message: validation.error });
    }

    const ip = getClientIp(req);
    const dailyKey = getDailyKey(ip);

    if (hasDailyCookie(req) || (await hasReachedDailyLimit(dailyKey))) {
      console.info("contact_daily_limit_reached", {
        hasKv: Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
        ip,
      });

      return res.status(429).json({
        code: "DAILY_LIMIT_REACHED",
        message: "Ya enviaste el mail diario permitido. Podes volver a escribirme manana.",
      });
    }

    await markDailyLimit(dailyKey);
    setDailyCookie(res);

    console.info("contact_daily_limit_reserved", {
      hasKv: Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
      ip,
    });

    return res.status(200).json({ message: "Envio permitido." });
  } catch (error) {
    return res.status(500).json({
      message: "No se pudo enviar el mensaje. Proba escribirme por email o WhatsApp.",
    });
  }
};
