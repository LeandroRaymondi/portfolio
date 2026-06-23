import React from "react";

const Frontend = () => {
  const skills = [
    ["HTML/CSS", "Interfaces responsive"],
    ["JavaScript", "Lógica e interacción"],
    ["React", "Componentes y SPAs"],
    ["Bootstrap/SASS", "UI productiva"],
    ["Git/GitHub", "Flujo de versionado"],
    ["APIs", "Consumo e integracion"],
  ];

  return (
    <div className="skills__content">
      <h3 className="skills__title">Frontend y experiencia de usuario</h3>

      <div className="skills__box">
        {skills.map(([name, level]) => (
          <div className="skills__data" key={name}>
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills__name">{name}</h3>
              <span className="skills__level">{level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frontend;
