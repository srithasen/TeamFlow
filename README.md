# TeamFlow – AI Productivity & Team Collaboration Platform

## Project Overview

TeamFlow is a full-stack productivity and collaboration platform designed to improve team workflow management, project tracking, and task organization. The platform enables administrators and team members to collaborate efficiently through project management, task assignment, progress tracking, and role-based access control.

The application was developed using modern full-stack technologies including React.js, Node.js, Express.js, and MySQL, with deployment handled through Railway.

---

## Key Features

### Authentication & Security

* User Signup and Login
* JWT-based Authentication
* Password Encryption using bcrypt
* Role-Based Access Control
* Protected API Routes

### Admin Functionalities

* Create and Manage Projects
* Assign Tasks to Team Members
* Track Workspace Progress
* Monitor Team Productivity
* View Dashboard Analytics

### Member Functionalities

* View Assigned Tasks
* Update Task Status
* Track Deadlines
* Manage Personal Workflow

### Task Management

* Pending Tasks
* In Progress Tasks
* Completed Tasks
* Deadline Monitoring
* Overdue Task Detection

---

## Technology Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MySQL

### Deployment

* Railway

---

## Database Tables

### users

Stores user account details.

Fields:

* id
* name
* email
* password
* role
* created_at

### projects

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

### tasks

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

## API Endpoints

### Authentication

* POST /signup
* POST /login

### Projects

* GET /projects
* POST /projects

### Tasks

* GET /tasks
* POST /tasks
* PUT /tasks/:id
* GET /my-tasks

### Dashboard

* GET /dashboard/stats
* GET /dashboard/insights

### Users

* GET /users

---

## Installation Steps

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

```bash
npm install
node app.js
```

---

## Environment Variables

```env
MYSQLHOST=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
MYSQLPORT=
JWT_SECRET=
```

---

## Deployment Details

Frontend, backend, and database services were deployed using Railway. Environment variables were configured securely for production deployment.

---

## Challenges Faced During Development

Several real-world full-stack development challenges were solved during this project:

1. Backend deployment configuration
2. Railway environment variable setup
3. MySQL database connection handling
4. Authentication and authorization logic
5. Frontend-backend API integration
6. Database schema creation and debugging
7. React state handling issues
8. API error handling and debugging
9. Production deployment issues
10. Connection pooling and database stability

---

## Future Enhancements

* AI-powered productivity suggestions
* Real-time notifications
* Team chat system
* File sharing support
* Calendar integration
* Advanced analytics dashboard
* Activity tracking
* Email notifications

---

## Conclusion

TeamFlow is a scalable and production-oriented team collaboration platform developed using modern web technologies. The project demonstrates practical implementation of frontend development, backend APIs, authentication systems, database integration, deployment handling, and debugging techniques.

The platform provides an efficient solution for project management, task tracking, and team productivity improvement.
