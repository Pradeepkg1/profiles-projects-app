import express from "express";
import pool from "./db.js";

const router = express.Router();

// Health check endpoint
router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Create a new profile with optional skills & projects
router.post("/profiles", async (req, res) => {
  const db = await pool.connect();
  try {
    const {
      name,
      email,
      education,
      github,
      linkedin,
      portfolio,
      skills = [],
      projects = [],
    } = req.body;

    // Insert profile first
    const insertProfile = `
      INSERT INTO profiles (name, email, education, github, linkedin, portfolio)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id`;
    const profileResult = await db.query(insertProfile, [
      name,
      email,
      education,
      github,
      linkedin,
      portfolio,
    ]);

    const profileId = profileResult.rows[0].id;

    // Insert skills if provided
    for (const skill of skills) {
      await db.query(
        "INSERT INTO skills (name, level, profile_id) VALUES ($1,$2,$3)",
        [skill.name, skill.level, profileId]
      );
    }

    // Insert projects if provided
    for (const project of projects) {
      await db.query(
        `INSERT INTO projects (title, description, link, skill, profile_id)
         VALUES ($1,$2,$3,$4,$5)`,
        [project.title, project.description, project.link, project.skill, profileId]
      );
    }

    res.status(201).json({ id: profileId, name, email });
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ error: "Could not create profile" });
  } finally {
    db.release();
  }
});

// Fetch all profiles
router.get("/profiles", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM profiles");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Fetch projects (optionally filter by skill)
router.get("/projects", async (req, res) => {
  const { skill } = req.query;
  try {
    let result;
    if (skill) {
      result = await pool.query("SELECT * FROM projects WHERE skill ILIKE $1", [
        `%${skill}%`,
      ]);
    } else {
      result = await pool.query("SELECT * FROM projects");
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Fetch top 5 skills by usage
router.get("/skills/top", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT name, COUNT(*) AS frequency 
       FROM skills 
       GROUP BY name 
       ORDER BY frequency DESC 
       LIMIT 5`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching top skills:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Search profiles & projects
router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const profileQuery = `
      SELECT * FROM profiles 
      WHERE name ILIKE $1 OR education ILIKE $1
    `;
    const projectQuery = `
      SELECT * FROM projects 
      WHERE title ILIKE $1 OR description ILIKE $1
    `;
    const [profiles, projects] = await Promise.all([
      pool.query(profileQuery, [`%${q}%`]),
      pool.query(projectQuery, [`%${q}%`]),
    ]);

    res.json({ profiles: profiles.rows, projects: projects.rows });
  } catch (err) {
    console.error("Error searching data:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
