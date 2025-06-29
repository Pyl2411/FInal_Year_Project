const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ==== 🔌 Route Imports ====
const authRoutes = require("./routes/authRoutes");                      // 🔐 User login/register
const resumeRoutes = require("./routes/resumeRoutes");                 // 📄 Resume generator
const mockInterviewRoutes = require("./routes/mockInterviewRoutes");   // 🎤 Mock interview Q&A
const skillAnalysisRoutes = require("./routes/skillAnalysisRoutes");   // 📊 Skill gap analysis
const chatRoutes = require("./routes/chat");                           // 💬 Chat/AI support

const app = express();
const PORT = process.env.PORT || 5000;

// ==== 🌐 Middlewares ====
app.use(cors());
app.use(express.json());

// ==== 🔗 API Routes ====
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", mockInterviewRoutes);
app.use("/api/skills", skillAnalysisRoutes);
app.use("/api/chat", chatRoutes);

// ==== 🧪 Test Route ====
app.get("/", (req, res) => {
  res.send("🚀 Smart Career Platform Server is Live!");
});

// ==== 🗄️ MongoDB Connection ====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🌐 Server running at: http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
