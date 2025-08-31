import pool from "./db.js";
import fs from "fs";

const seedDatabase = async () => {
  try {
    // Load and apply schema
    const schemaSql = fs.readFileSync("./schema.sql", { encoding: "utf8" });
    await pool.query(schemaSql);

    // Clear existing data
    await pool.query("TRUNCATE projects, skills, profiles RESTART IDENTITY CASCADE");

    // Insert sample profile
    const profileInsert = `
      INSERT INTO profiles (name, email, education, github, linkedin, portfolio)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const { rows } = await pool.query(profileInsert, [
      "John Doe",
      "john@example.com",
      "B.Sc. Computer Science",
      "https://github.com/johndoe",
      "https://linkedin.com/in/johndoe",
      "https://portfolio.com/johndoe",
    ]);

    const profileId = rows[0].id;

    // Insert skills
    const skillsData = [
      ["JavaScript", "Advanced"],
      ["Python", "Intermediate"],
    ];

    for (const [name, level] of skillsData) {
      await pool.query(
        "INSERT INTO skills (name, level, profile_id) VALUES ($1, $2, $3)",
        [name, level, profileId]
      );
    }

    // Insert project
    await pool.query(
      `INSERT INTO projects (title, description, link, skill, profile_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        "Portfolio Website",
        "Personal portfolio built with React",
        "https://portfolio.com",
        "JavaScript",
        profileId,
      ]
    );

    console.log(" Seeding completed successfully");
  } catch (err) {
    console.error(" Error while seeding:", err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
