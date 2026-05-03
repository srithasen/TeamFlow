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