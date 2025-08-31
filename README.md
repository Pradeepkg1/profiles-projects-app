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
│── backend/              # Express + PostgreSQL server
│   ├── index.js          # API routes (/profiles, /projects)
│   ├── db.js             # Database connection
│   └── package.json
│
│── frontend/             # React app (Vite)
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



