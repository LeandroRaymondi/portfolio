import React from "react";

const WorkItems = ({ item }) => {
  return (
    <article className="work__card">
      <img src={item.image} alt={`Vista previa de ${item.title}`} className="work__img" />

      <div className="work__body">
        <span className="work__category">{item.category}</span>
        <h3 className="work__title">{item.title}</h3>
        <p className="work__summary">{item.summary}</p>

        <div className="work__stack">
          {item.stack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>

        <p className="work__impact">{item.impact}</p>

        <a href={item.url} className="work__button" target="_blank" rel="noreferrer">
          Ver proyecto
          <i className="bx bx-right-arrow-alt work__button-icon"></i>
        </a>
      </div>
    </article>
  );
};

export default WorkItems;
