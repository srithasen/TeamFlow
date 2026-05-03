const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../config/db");


// ================= SIGNUP =================

exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    // CHECK EXISTING USER

    const [existingUser] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if(existingUser.length > 0){

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // SAVE USER

    await db.promise().query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "User registered successfully"
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


// ================= LOGIN =================

exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // FIND USER

    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if(users.length === 0){

      return res.status(400).json({
        message: "Invalid email"
      });

    }

    const user = users[0];

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(password, user.password);

    if(!isMatch){

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    // JWT TOKEN

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      "teamflowsecret",
      {
        expiresIn: "1d"
      }
    );

    // RESPONSE

    res.status(200).json({

      token,

      user: {

        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role

      }

    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};