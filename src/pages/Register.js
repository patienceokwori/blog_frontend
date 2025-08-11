import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Simple frontend validation for password match
    if (formData.password !== formData.password2) {
      setError("❌ Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/register/`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("✅ Registration successful! You can now log in.");
      setFormData({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
      console.log("Server Response:", res.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("❌ Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form" autoComplete="on">
        <h2>Create Account</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          id="password2"
          name="password2"
          placeholder="Confirm password"
          value={formData.password2}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
