import GoogleAIConnect from "../../assets/googlexaiconnect.png";
import CardioDiabetesEnRed from "../../assets/cardiodiabetesenred.png";
import SepeliosNatarello from "../../assets/sepeliosnatarello.png";

export const projectsData = [
  {
    id: 1,
    image: GoogleAIConnect,
    title: "Google x AIConnect",
    category: "eventos",
    url: "https://youtube.com/shorts/zGlCkNKy94g",
    summary:
      "Plataforma interactiva para eventos presenciales con trivias, memotest, tótems, fotografía con tablets y puntaje en tiempo real por equipos.",
    stack: ["JavaScript", "PHP", "MySQL", "AWS"],
    impact: "Experiencia dinámica para potenciar participación y colaboración en vivo.",
  },
  {
    id: 2,
    image: CardioDiabetesEnRed,
    title: "Cardiodiabetesenred",
    category: "plataformas",
    url: "https://eventmedia.space/cardiodiabetesenred/",
    summary:
      "Plataforma de capacitación gamificada para colaboradores de Novo Nordisk con panel administrativo, leaderboard y control de sesiones.",
    stack: ["PHP", "MySQL", "JavaScript", "AWS"],
    impact: "Mayor participación y retención durante instancias de formación interna.",
  },
  {
    id: 3,
    image: SepeliosNatarello,
    title: "Sepelios Natarello",
    category: "sistemas",
    url: "https://sepeliosnatarello.com.ar/",
    summary:
      "Sitio corporativo con sistema de gestión personalizado, formulario de contacto, galería dinámica y sección de homenajes.",
    stack: ["PHP", "MySQL", "JavaScript", "AWS"],
    impact: "Modernización de presencia online y mejora de interacción con clientes.",
  },
];

export const projectsNav = [
  { name: "all", label: "Todos" },
  { name: "eventos", label: "Eventos" },
  { name: "plataformas", label: "Plataformas" },
  { name: "sistemas", label: "Sistemas" },
];
