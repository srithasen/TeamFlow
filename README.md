# TeamFlow – AI Productivity & Team Collaboration Platform

## Overview

TeamFlow is a full-stack productivity and collaboration platform designed for teams to manage projects, assign tasks, track progress, and improve workflow management.

The platform supports:

* Authentication system with JWT
* Role-based access (Admin & Member)
* Project management
* Task assignment and tracking
* Dashboard analytics
* Team collaboration
* Secure backend APIs
* MySQL database integration
* Railway deployment

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* MySQL2

## Database

* MySQL (Railway MySQL)

## Deployment

* Railway

---

# Features

## Authentication System

* User Signup
* User Login
* JWT Token Authentication
* Password Hashing using bcrypt
* Role-based authorization

## Admin Features

* Create Projects
* Assign Tasks
* Manage Team Members
* Update Task Status
* Dashboard Analytics
* View Workspace Progress

## Member Features

* View Assigned Tasks
* Update Task Progress
* Track Deadlines
* Workspace Dashboard

## Task Management

* Pending Tasks
* In Progress Tasks
* Completed Tasks
* Deadline Tracking
* Overdue Detection

---

# Database Tables

## users

Stores user account details.

Fields:

* id
* name
* email
* password
* role
* created_at

## projects

Stores project information.

Fields:

* id
* title
* description
* status
* progress
* priority
* created_by
* created_at

## tasks

Stores task details.

Fields:

* id
* project_id
* assigned_to
* title
* description
* status
* deadline
* created_at

---

# API Endpoints

## Authentication

* POST /signup
* POST /login

## Projects

* GET /projects
* POST /projects

## Tasks

* GET /tasks
* POST /tasks
* PUT /tasks/:id
* GET /my-tasks

## Dashboard

* GET /dashboard/stats
* GET /dashboard/insights

## Users

* GET /users

---

# Deployment

## Frontend Deployment

Frontend deployed on Railway.

## Backend Deployment

Backend deployed on Railway.

## Database

Railway MySQL database connected using environment variables.

---

# Security Features

* JWT authentication
* Protected routes
* Role-based authorization
* Password hashing with bcrypt
* Middleware validation

---

# Challenges Faced

During development several production-level issues were solved:

1. Railway deployment issues
2. Backend routing issues
3. MySQL connection problems
4. Environment variable configuration
5. Auto increment database errors
6. Undefined React state crashes
7. API integration bugs
8. Connection pool handling
9. Frontend-backend URL mismatch
10. Database schema setup issues

---

# Future Improvements

* AI-powered productivity suggestions
* Real-time notifications
* Team chat system
* File upload support
* Calendar integration
* Dark mode
* Activity tracking
* Email notifications
* Performance analytics

---

# Project Structure

## Frontend

* components/
* pages/
* services/
* routes/
* App.jsx

## Backend

* routes/
* middleware/
* config/
* app.js

---

# Installation

## Frontend

```bash
npm install
npm run dev
```

## Backend

```bash
npm install
node app.js
```

---

# Environment Variables

```env
MYSQLHOST=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
MYSQLPORT=
JWT_SECRET=
```

---

# Conclusion

TeamFlow is a scalable full-stack team collaboration platform built with modern technologies. The project demonstrates frontend development, backend API creation, authentication systems, database management, deployment handling, and debugging skills.

It provides a practical solution for project tracking, task assignment, and team productivity management.

---
