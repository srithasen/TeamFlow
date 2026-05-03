const express = require("express");

const router = express.Router();

const db = require("../config/db");

const authMiddleware =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("member"),

  (req, res) => {

    const projectsQuery =
      "SELECT * FROM projects";

    const tasksQuery = `
      SELECT *
      FROM tasks
      WHERE assigned_to = ?
    `;

    db.query(
      projectsQuery,

      (projectErr, projects) => {

        if (projectErr) {

          console.log(projectErr);

          return res.status(500).json({
            message: "Database error"
          });

        }

        db.query(
          tasksQuery,
          [req.user.id],

          (taskErr, tasks) => {

            if (taskErr) {

              console.log(taskErr);

              return res.status(500).json({
                message: "Database error"
              });

            }

            const completedTasks =
              tasks.filter(
                task =>
                  task.status === "completed"
              ).length;

            const pendingTasks =
              tasks.filter(
                task =>
                  task.status === "pending"
              ).length;

            const deadlines =
              tasks.filter(
                task =>
                  task.deadline
              ).length;

            res.status(200).json({

              projects,
              tasks,

              stats: {

                totalProjects:
                  projects.length,

                completedTasks,

                pendingTasks,

                deadlines

              }

            });

          }

        );

      }

    );

  }

);

module.exports = router;