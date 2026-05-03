const express = require("express");

const router = express.Router();

const db = require("../config/db");

const authMiddleware =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");


// GET PROJECTS
router.get(
  "/",

  authMiddleware,

  (req, res) => {

    const sql = `
      SELECT *
      FROM projects
      ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Database error"
        });

      }

      res.status(200).json({
        projects: results
      });

    });

  }
);


// CREATE PROJECT
router.post(
  "/",

  authMiddleware,

  authorizeRoles("admin"),

  (req, res) => {

    const {
      title,
      description,
      priority
    } = req.body;

    const sql = `
      INSERT INTO projects
      (
        title,
        description,
        status,
        progress,
        priority,
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,

      [
        title,
        description,
        "Active",
        0,
        priority || "Medium",
        req.user.id
      ],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            message: "Database error"
          });

        }

        res.status(201).json({
          message: "Project created"
        });

      }

    );

  }
);

module.exports = router;