
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const memberRoutes = require("./routes/memberRoutes");
const projectRoutes =
  require("./routes/projectRoutes");
const teamRoutes =
  require("./routes/teamRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/projects", ProjectRoutes);;
app.use("/member", memberRoutes);
app.use("/team", teamRoutes);

app.use("/tasks", taskRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
    res.send("TeamFlow Backend Running");
});


// SIGNUP ROUTE
app.post("/signup", async (req, res) => {

    const { name, email, password, role } = req.body;

    const userRole = role || "member";

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [name, email, hashedPassword, userRole],
            (err, result) => {

                if (err) {

                    console.log(err);

                    // DUPLICATE EMAIL ERROR
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            message: "Email already exists"
                        });
                    }

                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                res.status(201).json({
                    message: "User registered successfully"
                });

            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// LOGIN ROUTE
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password required"
        });
    }

    const sql = `
        SELECT * FROM users WHERE email = ?
    `;

    db.query(sql, [email], async (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            "teamflow_secret_key",
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    });

});


// PROTECTED DASHBOARD ROUTE
app.get("/dashboard", authMiddleware, (req, res) => {

    res.json({
        message: "Welcome to dashboard",
        user: req.user
    });

});

app.get(
    "/admin",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });

    }
);

app.post(
    "/tasks",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {

        const {
            project_id,
            assigned_to,
            title,
            description,
            status,
            deadline
        } = req.body;

        // VALIDATION
        if (
            !project_id ||
            !assigned_to ||
            !title ||
            !description
        ) {

            return res.status(400).json({
                message: "All required fields must be provided"
            });

        }

        const taskStatus = status || "pending";

        const sql = `
            INSERT INTO tasks
            (
                project_id,
                assigned_to,
                title,
                description,
                status,
                deadline
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                project_id,
                assigned_to,
                title,
                description,
                taskStatus,
                deadline
            ],
            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        message: "Database error"
                    });

                }

                res.status(201).json({
                    message: "Task created successfully"
                });

            }
        );

    }
);

app.get(
    "/tasks",
    authMiddleware,
    (req, res) => {

        const sql = `
            SELECT
                tasks.id,
                tasks.title,
                tasks.description,
                tasks.status,
                tasks.deadline,
                tasks.created_at,

                projects.title AS project_name,

                users.name AS assigned_user

            FROM tasks

            JOIN projects
            ON tasks.project_id = projects.id

            JOIN users
            ON tasks.assigned_to = users.id

            ORDER BY tasks.created_at DESC
        `;

        db.query(sql, (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }

            res.status(200).json({
                tasks: results
            });

        });

    }
);

app.get(
    "/users",
    authMiddleware,
    (req, res) => {

        const sql = `
            SELECT id, name, email, role
            FROM users
        `;

        db.query(sql, (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }

            res.status(200).json({
                users: results
            });

        });

    }
);

app.get(
    "/admin/dashboard",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {

        const statsSql = `
            SELECT

                COUNT(DISTINCT projects.id) AS total_projects,

                SUM(
                    CASE
                        WHEN tasks.status = 'completed'
                        THEN 1
                        ELSE 0
                    END
                ) AS completed_tasks,

                SUM(
                    CASE
                        WHEN tasks.status = 'pending'
                        THEN 1
                        ELSE 0
                    END
                ) AS pending_tasks,

                SUM(
                    CASE
                        WHEN tasks.status = 'in_progress'
                        THEN 1
                        ELSE 0
                    END
                ) AS in_progress_tasks

            FROM projects

            LEFT JOIN tasks
            ON projects.id = tasks.project_id
        `;

        db.query(statsSql, (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }

            res.status(200).json({
                stats: results[0]
            });

        });

    }
);

app.get(
    "/member/dashboard",
    authMiddleware,
    authorizeRoles("member"),
    (req, res) => {

        const sql = `
            SELECT *
            FROM tasks
            WHERE assigned_to = ?
        `;

        db.query(
            sql,
            [req.user.id],
            (err, results) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        message: "Database error"
                    });

                }

                res.status(200).json({
                    tasks: results
                });

            }
        );

    }
);

app.put(
    "/tasks/:id",
    authMiddleware,
    (req, res) => {

        const taskId = req.params.id;

        const { status } = req.body;

        // VALIDATION
        if (!status) {

            return res.status(400).json({
                message: "Status is required"
            });

        }

        // FIRST FETCH TASK
        const fetchTaskSql = `
            SELECT * FROM tasks
            WHERE id = ?
        `;

        db.query(
            fetchTaskSql,
            [taskId],
            (fetchErr, fetchResult) => {

                if (fetchErr) {

                    console.log(fetchErr);

                    return res.status(500).json({
                        message: "Database error"
                    });

                }

                // TASK NOT FOUND
                if (fetchResult.length === 0) {

                    return res.status(404).json({
                        message: "Task not found"
                    });

                }

                const task = fetchResult[0];

                // AUTHORIZATION CHECK
                const isAdmin =
                    req.user.role === "admin";

                const isAssignedUser =
                    req.user.id === task.assigned_to;

                if (!isAdmin && !isAssignedUser) {

                    return res.status(403).json({
                        message: "Access denied"
                    });

                }

                // UPDATE TASK
                const updateSql = `
                    UPDATE tasks
                    SET status = ?
                    WHERE id = ?
                `;

                db.query(
                    updateSql,
                    [status, taskId],
                    (updateErr, updateResult) => {

                        if (updateErr) {

                            console.log(updateErr);

                            return res.status(500).json({
                                message: "Database error"
                            });

                        }

                        res.status(200).json({
                            message: "Task updated successfully"
                        });

                    }
                );

            }
        );

    }
);

app.get(
    "/my-tasks",
    authMiddleware,
    (req, res) => {

        let sql = "";

        // ADMIN → SEE ALL TASKS
        if (req.user.role === "admin") {

            sql = `
                SELECT
                    tasks.id,
                    tasks.title,
                    tasks.description,
                    tasks.status,
                    tasks.deadline,

                    projects.title AS project_name,

                    users.name AS assigned_user

                FROM tasks

                JOIN projects
                ON tasks.project_id = projects.id

                JOIN users
                ON tasks.assigned_to = users.id

                ORDER BY tasks.created_at DESC
            `;

            db.query(sql, (err, results) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        message: "Database error"
                    });

                }

                return res.status(200).json({
                    tasks: results
                });

            });

        }

        // MEMBER → ONLY ASSIGNED TASKS
        else {

            sql = `
                SELECT
                    tasks.id,
                    tasks.title,
                    tasks.description,
                    tasks.status,
                    tasks.deadline,

                    projects.title AS project_name,

                    users.name AS assigned_user

                FROM tasks

                JOIN projects
                ON tasks.project_id = projects.id

                JOIN users
                ON tasks.assigned_to = users.id

                WHERE tasks.assigned_to = ?

                ORDER BY tasks.created_at DESC
            `;

            db.query(
                sql,
                [req.user.id],
                (err, results) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: "Database error"
                        });

                    }

                    return res.status(200).json({
                        tasks: results
                    });

                }
            );

        }

    }
);

app.get(
    "/dashboard/stats",
    authMiddleware,
    (req, res) => {

        const sql = `
            SELECT

                COUNT(*) AS total_tasks,

                SUM(
                    CASE
                        WHEN status = 'completed'
                        THEN 1
                        ELSE 0
                    END
                ) AS completed_tasks,

                SUM(
                    CASE
                        WHEN status = 'pending'
                        THEN 1
                        ELSE 0
                    END
                ) AS pending_tasks,

                SUM(
                    CASE
                        WHEN status = 'in_progress'
                        THEN 1
                        ELSE 0
                    END
                ) AS in_progress_tasks,

                SUM(
                    CASE
                        WHEN deadline < CURDATE()
                        AND status != 'completed'
                        THEN 1
                        ELSE 0
                    END
                ) AS overdue_tasks

            FROM tasks
        `;

        db.query(sql, (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }

            const stats = results[0];

            // CALCULATE COMPLETION RATE
            const completionRate =
                stats.total_tasks > 0
                    ? (
                        (stats.completed_tasks / stats.total_tasks) * 100
                    ).toFixed(0)
                    : 0;

            res.status(200).json({
                total_tasks: stats.total_tasks,
                completed_tasks: stats.completed_tasks,
                pending_tasks: stats.pending_tasks,
                in_progress_tasks: stats.in_progress_tasks,
                overdue_tasks: stats.overdue_tasks,
                completion_rate: `${completionRate}%`
            });

        });

    }
);

app.get(
    "/dashboard/insights",
    authMiddleware,
    (req, res) => {

        const sql = `
            SELECT

                COUNT(*) AS total_tasks,

                SUM(
                    CASE
                        WHEN status = 'completed'
                        THEN 1
                        ELSE 0
                    END
                ) AS completed_tasks,

                SUM(
                    CASE
                        WHEN status = 'pending'
                        THEN 1
                        ELSE 0
                    END
                ) AS pending_tasks,

                SUM(
                    CASE
                        WHEN deadline < CURDATE()
                        AND status != 'completed'
                        THEN 1
                        ELSE 0
                    END
                ) AS overdue_tasks

            FROM tasks
        `;

        db.query(sql, (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }

            const stats = results[0];

            // CALCULATE COMPLETION RATE
            const completionRate =
                stats.total_tasks > 0
                    ? (
                        (stats.completed_tasks / stats.total_tasks) * 100
                    ).toFixed(0)
                    : 0;

            // AI-STYLE INSIGHTS
            const insights = {

                overdue_message:
                    stats.overdue_tasks > 0
                        ? `${stats.overdue_tasks} tasks are overdue`
                        : "No overdue tasks. Great job!",

                completion_message:
                    `Completion rate is ${completionRate}%`,

                pending_message:
                    `${stats.pending_tasks} tasks are still pending`,

                motivation_message:
                    completionRate >= 70
                        ? "Excellent productivity this week!"
                        : "Keep pushing! You're making progress."

            };

            res.status(200).json({
                insights
            });

        });

    }
);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});