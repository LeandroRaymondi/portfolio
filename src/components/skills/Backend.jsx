import React from "react";

const Backend = () => {
  const skills = [
    ["PHP", "Lógica de negocio"],
    ["MySQL/SQL", "Consultas y modelado"],
    ["LAMP", "Linux, Apache, MySQL, PHP"],
    ["AWS", "Deploys en producción"],
    ["Paneles admin", "CRUDs y gestión"],
    ["Seguridad", "Manejo de datos"],
  ];

  return (
    <div className="skills__content">
      <h3 className="skills__title">Backend, datos y despliegue</h3>

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

export default Backend;
