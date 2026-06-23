import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

const CONTACT_LIMIT_KEY = "portfolio_contact_sent_date";

const getToday = () => new Date().toISOString().slice(0, 10);

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    if (localStorage.getItem(CONTACT_LIMIT_KEY) === getToday()) {
      setStatus("daily-limit");
      return;
    }

    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const payload = {
      from_name: formData.get("from_name"),
      from_email: formData.get("from_email"),
      message: formData.get("message"),
    };
    const templateParams = {
      clientName: payload.from_name,
      ...payload,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        setStatus("daily-limit");
        return;
      }

      if (!response.ok) {
        throw new Error("No se pudo enviar el mensaje.");
      }

      await emailjs.send("service_l4rujge", "template_trwgstn", templateParams, "vQLEyaJKx0Mb8rlC0");

      e.target.reset();
      localStorage.setItem(CONTACT_LIMIT_KEY, getToday());
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Hablemos</h2>
      <span className="section__subtitle">Disponible para oportunidades full-stack y proyectos web</span>

      <div className="contact__container container grid">
        <div className="contact__content">
          <h3 className="contact__title">Contacto directo</h3>

          <div className="contact__info">
            <div className="contact__card">
              <i className="bx bx-mail-send contact__card-icon"></i>
              <h3 className="contact__card-title">Email</h3>
              <span className="contact__card-data">ezequielraymondi@gmail.com</span>
              <a href="mailto:ezequielraymondi@gmail.com" className="contact__button">
                Escribirme <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </div>

            <div className="contact__card">
              <i className="bx bxl-whatsapp contact__card-icon"></i>
              <h3 className="contact__card-title">WhatsApp</h3>
              <span className="contact__card-data">+54 11 6848 9990</span>
              <a
                href="https://api.whatsapp.com/send?phone=541168489990&text=Hola%20Leandro%2C%20vi%20tu%20portfolio%20y%20quiero%20hablar%20sobre%20una%20oportunidad."
                className="contact__button"
                target="_blank"
                rel="noreferrer"
              >
                Enviar mensaje <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </div>

            <div className="contact__card contact__card--note">
              <i className="bx bx-code-alt contact__card-icon"></i>
              <h3 className="contact__card-title">Lo que puedo aportar</h3>
              <span className="contact__card-data">
                Sistemas PHP/MySQL, paneles internos, sitios corporativos y experiencias interactivas.
              </span>
            </div>
          </div>
        </div>

        <div className="contact__content">
          <h3 className="contact__title">Escribime sobre la oportunidad</h3>

          <form ref={form} onSubmit={sendEmail} className="contact__form">
            <div className="contact__form-div">
              <label className="contact__form-tag">Nombre</label>
              <input type="text" name="from_name" className="contact__form-input" placeholder="Tu nombre" required />
            </div>

            <div className="contact__form-div">
              <label className="contact__form-tag">Email</label>
              <input type="email" name="from_email" className="contact__form-input" placeholder="tu@email.com" required />
            </div>

            <div className="contact__form-div contact__form-area">
              <label className="contact__form-tag">Mensaje</label>
              <textarea
                name="message"
                cols="30"
                rows="10"
                className="contact__form-input"
                placeholder="Contame sobre el rol, proyecto o desafio"
                required
              ></textarea>
            </div>

            <button className="button button--flex" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
              <i className="bx bx-send button__icon"></i>
            </button>

            {status === "success" && (
              <p className="contact__status contact__status--success">
                Mensaje enviado correctamente. Te voy a responder pronto.
              </p>
            )}

            {status === "error" && (
              <p className="contact__status contact__status--error">
                No se pudo enviar el mensaje. Proba escribirme por email o WhatsApp.
              </p>
            )}

            {status === "daily-limit" && (
              <p className="contact__status contact__status--warning">
                Recibimos tu consulta recientemente. Si necesitas agregar algo, podes escribirme por WhatsApp o email.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
