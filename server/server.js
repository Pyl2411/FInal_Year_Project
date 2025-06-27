const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importing route files
const authRoutes = require("./routes/authRoutes");               // 🔒 User login/register
const resumeRoutes = require("./routes/resumeRoutes");           // 📄 Resume generation
const mockInterviewRoutes = require("./routes/mockInterviewRoutes"); // 🎤 Mock interview
const skillAnalysisRoutes = require("./routes/skillAnalysisRoutes"); // 📊 Skill gap analysis

const app = express();

// === 🌐 Middleware ===
app.use(cors());
app.use(express.json());

// === 🔗 API Routes ===
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", mockInterviewRoutes);   // ➕ Added
app.use("/api/skills", skillAnalysisRoutes);      // ➕ Added

// === 🛠 Test Route ===
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// === 🔗 MongoDB Connection ===
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(5000, () =>
      console.log("🌐 Server running on http://localhost:5000")
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
