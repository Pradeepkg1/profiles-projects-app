import React from "react";

function Projects({ projects }) {
  return (
    <div>
      <h2>Projects</h2>
      {projects.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <a href={p.link}>{p.link}</a>
        </div>
      ))}
    </div>
  );
}

export default Projects;