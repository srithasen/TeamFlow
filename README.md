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

# VIDEO EXPLANATION SCRIPT

## 1. Introduction

"Hello everyone. My project name is TeamFlow. TeamFlow is a full-stack AI productivity and collaboration platform developed to help teams manage projects, assign tasks, and track workflow efficiently. This project was built using React, Node.js, Express, MySQL, JWT authentication, and Railway deployment."

---

## 2. Problem Statement

"Many teams struggle with task tracking, collaboration, and project organization. Existing tools are often complicated or overloaded with features. TeamFlow focuses on creating a clean, simple, and efficient productivity system for teams and organizations."

---

## 3. Tech Stack Explanation

"For frontend development I used React.js and Tailwind CSS. For backend I used Node.js and Express.js. For authentication I used JWT and bcrypt. MySQL was used as the database and the entire project was deployed using Railway."

---

## 4. Authentication Demo

"First, users can sign up and log in securely. Passwords are hashed using bcrypt and JWT tokens are generated for authentication. The application supports two roles: Admin and Member."

---

## 5. Admin Dashboard Demo

"After login, the admin can access the dashboard. The admin can create projects, assign tasks, monitor progress, and manage the entire workspace. The dashboard displays project statistics, task analytics, and workspace progress."

---

## 6. Task Management Demo

"In the tasks section, tasks are categorized into Pending, In Progress, and Completed sections. Admins can assign tasks to members and update deadlines. Members can update task status as work progresses."

---

## 7. Member Dashboard Demo

"Members can log in and view only their assigned tasks. This ensures role-based access control and secure task management."

---

## 8. Database and Backend

"The backend APIs are connected to a MySQL database hosted on Railway. The application uses protected APIs, middleware validation, and connection pooling for stability and security."

---

## 9. Challenges Faced

"During development I faced several real-world deployment and debugging issues including Railway deployment errors, database connection failures, environment variable setup, frontend rendering crashes, and API integration problems. These issues helped me understand full-stack debugging and production deployment more deeply."

---

## 10. Future Scope

"In the future I plan to add AI-based productivity suggestions, real-time collaboration features, notifications, chat functionality, and advanced analytics."

---

## 11. Conclusion

"TeamFlow demonstrates full-stack dev
