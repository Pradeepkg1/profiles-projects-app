
const API_URL = "https://profiles-projects-app.onrender.com"; 

export async function fetchProfiles() {
  const res = await fetch(`${API_URL}/profiles`);
  if (!res.ok) throw new Error("Failed to fetch profiles");
  return res.json();
}

export async function fetchProjects(skill) {
  let url = `${API_URL}/projects`;
  if (skill && skill.trim() !== "") {
    url += `?skill=${encodeURIComponent(skill)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}
