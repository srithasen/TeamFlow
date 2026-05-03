const express = require("express");

const router = express.Router();

const db = require("../config/db");

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/",
  authMiddleware,

  (req, res) => {

    const sql = `
      SELECT
        id,
        name,
        email,
        role
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
        members: results
      });

    });

  }

);

router.post(
  "/",

  authMiddleware,

  authorizeRoles("admin"),

  (req, res) => {

    const {
      project_id,
      assigned_to,
      title,
      description,
      deadline
    } = req.body;

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
        "pending",
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
          message: "Task created"
        });

      }

    );

  }
);

module.exports = router;