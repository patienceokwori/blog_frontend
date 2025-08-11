import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

// Use environment variable for API URL
// In Vercel: set REACT_APP_API_URL = https://backend-blog-yk2f.onrender.com
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

    // ✅ Check if passwords match before sending
    if (formData.password !== formData.password2) {
      setError("❌ Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/register/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("✅ Registration successful! You can now log in.");
      console.log("Server Response:", res.data);
    } catch (err) {
      if (err.response?.data) {
        // ✅ Show errors nicely instead of raw JSON
        setError(Object.values(err.response.data).flat().join(" "));
      } else {
        setError("❌ Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Create Account</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="password2"
          placeholder="Confirm password"
          value={formData.password2}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
