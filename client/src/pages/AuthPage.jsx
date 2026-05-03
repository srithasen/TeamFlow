// src/pages/AuthPage.jsx
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {

  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");

  /* ================= LOGIN STATE ================= */

  

  /* ================= SIGNUP STATE ================= */

  const [signupRole, setSignupRole] = useState("");


  /* ================= SIGNUP REDIRECT ================= */

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(
      "http://localhost:5000/login",
      {
        email,
        password
      }
    );

    const role = res.data.user.role;

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    if(role === "admin"){

      navigate("/admin-dashboard");

    }
    else if(role === "manager"){

      navigate("/manager-dashboard");

    }
    else{

      navigate("/member-dashboard");

    }

  }
  catch(error){

    alert("Invalid email or password");

    console.log(error);

  }

};

const handleSignup = async (e) => {

  e.preventDefault();

  try {

    await axios.post(
      "http://localhost:5000/signup",
      {
        name,
        email,
        password,
        role: signupRole
      }
    );

    alert("Signup successful");

    setActive(false);

  }
  catch(error){

    alert(
      error.response?.data?.message ||
      "Signup failed"
    );

    console.log(error);

  }

};

  return (

    <div className="auth-wrapper">

      <div className={`container ${active ? "active" : ""}`}>

        {/* ================= SIGN IN ================= */}

        <div className="form-box login">

          <form onSubmit={handleLogin}>

            <h1>Sign In to TeamFlow</h1>

            <p className="subtitle">
              Access your workspace and continue managing your projects.
            </p>

            <div className="input-box">

              <input
  type="email"
  placeholder="Work Email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

            </div>

            <div className="input-box">

              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* ROLE SELECT */}

          

            <div className="forgot-link">

              <a href="#">
                Forgot Password?
              </a>

            </div>

            <button
              type="submit"
              className="btn"
            >
              Sign In
            </button>

          </form>

        </div>

        {/* ================= SIGN UP ================= */}

        <div className="form-box register">

          <form onSubmit={handleSignup}>

            <h1>Create Workspace Account</h1>

            <p className="subtitle">
              Start collaborating with your team inside TeamFlow.
            </p>

            <div className="input-box">

              <input
  type="text"
  placeholder="Full Name"
  required
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

            </div>

            <div className="input-box">

              <input
  type="email"
  placeholder="Work Email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

            </div>

            <div className="input-box">

              <input
  type="password"
  placeholder="Password"
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

            </div>

            <div className="input-box">

              <select
                required
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
              >

                <option value="">
                  Select Workspace Role
                </option>

                <option value="member">
                  Member
                </option>

                <option value="manager">
                  Manager
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>

            </div>

            <button
              type="submit"
              className="btn"
            >
              Create Account
            </button>

          </form>

        </div>

        {/* ================= TOGGLE PANEL ================= */}

        <div className="toggle-box">

          {/* LEFT PANEL */}

          <div className="toggle-panel toggle-left">

            <h1>New to TeamFlow?</h1>

            <p>
              Create your workspace and manage projects with your team efficiently.
            </p>

            <button
              type="button"
              className="btn transparent"
              onClick={() => setActive(true)}
            >
              Create Account
            </button>

          </div>

          {/* RIGHT PANEL */}

          <div className="toggle-panel toggle-right">

            <h1>Welcome to TeamFlow</h1>

            <p>
              Manage projects, collaborate with your team, track progress,
              and boost productivity from one modern workspace.
            </p>

            <button
              type="button"
              className="btn transparent"
              onClick={() => setActive(false)}
            >
              Sign In
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AuthPage;