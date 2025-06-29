import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // 🔐 Login flow
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();
        if (response.ok && data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard"; // ✅ Force redirect
        } else {
          alert(data.message || "Login failed");
        }
      } catch (err) {
        console.error("Login error", err);
        alert("Server error during login");
      }

    } else {
      // 📝 Registration flow
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
          alert("Registered successfully! Now login.");
          setIsLogin(true);
        } else {
          alert(data.message || "Registration failed");
        }
      } catch (err) {
        console.error("Registration error", err);
        alert("Server error during registration");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p onClick={toggleForm} style={styles.toggle}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    width: "300px"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%"
  },
  toggle: {
    marginTop: "15px",
    color: "#667eea",
    cursor: "pointer",
    textDecoration: "underline"
  }
};

export default LoginRegister;
