import React from "react";
import CV from "../../assets/leandroraymondi-cv.pdf";

const Data = () => {
  return (
    <div className="home__data">
      <span className="home__eyebrow">Disponible para equipos y proyectos web</span>
      <h1 className="home__title">Leandro Ezequiel Raymondi Rossa</h1>
      <h3 className="home__subtitle">Full-Stack Developer PHP/LAMP</h3>

      <p className="home__description">
        Desarrollo plataformas web, paneles administrativos y experiencias interactivas con PHP, MySQL,
        JavaScript y AWS. Vengo de trabajar en soluciones para clientes como Google, Novo Nordisk,
        Roche y AstraZeneca.
      </p>

      <div className="home__actions">
        <a href="#portfolio" className="button button--flex">
          Ver casos reales <i className="bx bx-right-arrow-alt button__icon"></i>
        </a>
        <a download="" href={CV} className="button button--ghost button--flex">
          Descargar CV <i className="bx bx-download button__icon"></i>
        </a>
      </div>

      <div className="home__proof">
        <span>+2 años de experiencia</span>
        <span>Stack LAMP + AWS</span>
        <span>+7 proyectos para clientes</span>
      </div>
    </div>
  );
};

export default Data;
