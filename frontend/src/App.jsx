import React, { useState, useEffect } from "react";
import { fetchProfiles, fetchProjects } from "./api";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Projects from "./components/Projects";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProfiles().then(setProfiles);
  }, []);

  const handleSearch = (skill) => {
    fetchProjects(skill).then(setProjects);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Candidate Playground</h1>
      <Search onSearch={handleSearch} />
      <Profile profiles={profiles} />
      <Projects projects={projects} />
    </div>
  );
}

export default App;