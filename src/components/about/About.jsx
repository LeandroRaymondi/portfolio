import React from "react";
import "./about.css";
import AboutImg from "../../assets/about.jpg";
import CV from "../../assets/leandroraymondi-cv.pdf";
import Info from "./Info";

const About = () => {
  return (
    <section className="about section" id="about">
      <h2 className="section__title">Sobre mí</h2>
      <span className="section__subtitle">De sitios a sistemas en producción</span>

      <div className="about__container container grid">
        <img src={AboutImg} alt="Leandro Raymondi" className="about__img" />

        <div className="about__data">
          <Info />

          <p className="about__description">
            Soy desarrollador full-stack con foco en PHP, MySQL y JavaScript. Trabajo sobre el ciclo completo:
            análisis, arquitectura, desarrollo, paneles administrativos, optimización de consultas y despliegue
            en AWS. Me interesa construir productos claros para el usuario y mantenibles para el equipo que los
            sigue operando.
          </p>

          <a download="" href={CV} className="button button--flex">
            Descargar CV <i className="bx bx-download button__icon"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
