# profiles-projects-app
# Candidate Playground

A simple full-stack application to explore candidate profiles and their projects.  
Built with **React (Vite)** on the frontend and **PostgreSQL + Node/Express** on the backend.

---

## Features

- View candidate **profiles** (name, email, education).
- Search and filter **projects** by skill (JavaScript, React, PostgreSQL, etc.).
- Backend API powered by **Express** with PostgreSQL as the database.

---

## Tech Stack

**Frontend**
- React (Vite)
- Fetch API

**Backend**
- Node.js
- Express.js
- PostgreSQL

---

## Project Structure

candidate-playground/
│── backend/              
│   ├── index.js          
│   ├── db.js             
│   └── package.json
│

│── frontend/             
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   │   ├── Profile.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Search.jsx
│   └── package.json
│
└── README.md
---

## Local Development
**1. Clone the repo**
-git clone https://github.com/Pradeepkg1/profiles-projects-app.git  
-cd candidate-playground
   
**2.Database Setup**
-Create a PostgreSQL database: createdb playground
-Run schema: psql -d playground -f backend/schema.sql
-Seed database: node backend/seed.js
   
**3.Backend Setup**
--cd backend
--npm install
--npm start
--Backend will run at: http://localhost:8000

  **4. Frontend Setup**
   -cd ../frontend
   -npm install
   -npm run dev
   -Frontend will run at: http://localhost:5173
  --- 

  ## Database Schema
  
   CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    education TEXT,
    github TEXT,
    linkedin TEXT,
    portfolio TEXT
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name TEXT,
    level TEXT,
    profile_id INT REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    link TEXT,
    skill TEXT,
    profile_id INT REFERENCES profiles(id) ON DELETE CASCADE
);
---
## Sample Data

INSERT INTO profiles (name, email, education, github, linkedin, portfolio)
VALUES ('John Doe', 'john@example.com', 'B.Sc. Computer Science',
        'https://github.com/johndoe',
        'https://linkedin.com/in/johndoe',
        'https://portfolio.com/johndoe');

INSERT INTO skills (name, level, profile_id)
VALUES ('JavaScript', 'Advanced', 1),
       ('Python', 'Intermediate', 1);

INSERT INTO projects (title, description, link, skill, profile_id)
VALUES ('Portfolio Website', 'Personal portfolio in React', 'https://portfolio.com', 'JavaScript', 1);

---


## API Usage (cURL / Postman):

 **Get all profiles:**
curl http://localhost:8000/profiles

**Get all projects:**
curl http://localhost:8000/projects

**Search projects by skill:**
curl "http://localhost:8000/projects?skill=JavaScript"

**Global search (profiles + projects):**
curl "http://localhost:8000/search?q=React"

**Top skills:**
curl http://localhost:8000/skills/top



## ⚠️ Known Limitations
  1.No authentication (anyone can access the API).
  2.Search is case-insensitive but limited to simple ILIKE queries.
  3.Only one profile/project is seeded by default (extend seed.js for more).
  4.Not optimized for large datasets (no pagination yet).



