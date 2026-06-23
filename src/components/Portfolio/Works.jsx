import React, { useState, useEffect } from "react";
import { projectsData, projectsNav } from "./Data";
import WorkItems from "./WorkItems";

const Projects = () => {
  const [item, setItem] = useState({ name: "all" });
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (item.name === "all") {
      setProjects(projectsData);
    } else {
      setProjects(projectsData.filter((project) => project.category === item.name));
    }
  }, [item]);

  const handleClick = (projectNavItem, index) => {
    setItem({ name: projectNavItem.name });
    setActive(index);
  };

  return (
    <div>
      <div className="work__filters">
        {projectsNav.map((projectNavItem, index) => (
          <button
            type="button"
            onClick={() => handleClick(projectNavItem, index)}
            className={`${active === index ? "active-work" : ""} work__item`}
            key={projectNavItem.name}
          >
            {projectNavItem.label}
          </button>
        ))}
      </div>

      <div className="work__container container grid">
        {projects.map((project) => (
          <WorkItems item={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
