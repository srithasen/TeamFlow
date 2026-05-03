const express = require("express");

const router = express.Router();

const db = require("../config/db");

const authMiddleware =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

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

module.exports = router;