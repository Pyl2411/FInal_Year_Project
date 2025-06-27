// routes/resumeRoutes.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post("/generate", async (req, res) => {
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
=========================
        RESUME
=========================

Full Name     : ${fullName}
Email         : ${email}
Degree        : ${degree}
University    : ${university}
Graduation    : ${graduationYear}
Skills        : ${skills}
Interests     : ${interests}
Experience    : ${experience}
Certifications: ${certifications}
Career Goals  : ${careerGoals}

=========================
    Thank you!
=========================
`;

    // Write resume content to a temp file
    const filePath = path.join(__dirname, "../temp_resume.txt");
    fs.writeFileSync(filePath, resumeText);

    // Send file for download
    res.download(filePath, "Resume.txt", (err) => {
      if (err) {
        console.error("❌ Download error:", err);
        res.status(500).send("Download failed.");
      }
      // Clean up the temp file
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error("❌ Resume generation error:", err);
    res.status(500).json({ error: "Failed to generate resume." });
  }
});

module.exports = router;
