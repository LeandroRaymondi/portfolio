import React from "react";
import "./work.css";
import Works from "./Works";

const Work = () => {
  return (
    <section className="work section" id="portfolio">
      <h2 className="section__title">Casos reales</h2>
      <span className="section__subtitle">Proyectos con negocio, usuarios y producción</span>

      <Works />
    </section>
  );
};

export default Work;
