// routes/resume.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken"); // if JWT is used

router.post("/generate", verifyToken, async (req, res) => {
  try {
    const {
      fullName,
      email,
      degree,
      university,
      graduationYear,
      skills,
      interests,
      experience,
      certifications,
      careerGoals,
    } = req.body;

    const resumeText = `
Name: ${fullName}
Email: ${email}
Degree: ${degree}
University: ${university}
Graduation Year: ${graduationYear}
Skills: ${skills}
Interests: ${interests}
Experience: ${experience}
Certifications: ${certifications}
Career Goals: ${careerGoals}
    `;

    res.setHeader("Content-Disposition", "attachment; filename=Resume.txt");
    res.setHeader("Content-Type", "text/plain");
    res.send(resumeText);
  } catch (err) {
    console.error("Resume generation error:", err.message);
    res.status(500).json({ message: "Resume generation failed" });
  }
});

module.exports = router;
