// src/pages/SkillGap.js
import React from "react";

const SkillGap = () => {
  const currentSkills = ["HTML", "CSS", "JavaScript"];
  const targetRole = "Full Stack Developer";
  const requiredSkills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git", "REST APIs"];

  const missingSkills = requiredSkills.filter(skill => !currentSkills.includes(skill));

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Skill Gap Analysis</h2>
        <p><strong>Target Role:</strong> {targetRole}</p>

        <div style={styles.section}>
          <h4>Your Current Skills:</h4>
          <ul>
            {currentSkills.map((skill, index) => (
              <li key={index}>✅ {skill}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h4>Recommended Skills to Learn:</h4>
          <ul>
            {missingSkills.map((skill, index) => (
              <li key={index}>📌 {skill}</li>
            ))}
          </ul>
        </div>

        <p style={{ marginTop: "20px" }}>
          🧠 Focus on these areas to increase your chances of becoming a <strong>{targetRole}</strong>.
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    minHeight: "100vh",
  },
  container: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  section: {
    marginTop: "20px",
  },
};

export default SkillGap;
