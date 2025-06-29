// Dashboard.jsx (Merged with Chatbot)
import React, { useState } from "react";
import Chatbot from "../components/Chatbot"; // ✅ Import Chatbot component


 // ✅ Optional: if chatbot CSS is placed here

const Dashboard = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    degree: "",
    university: "",
    graduationYear: "",
    skills: "",
    interests: "",
    experience: "",
    certifications: "",
    careerGoals: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [careerSuggestions, setCareerSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCertificateFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  const getToken = () => localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("🎯 Career suggestions generated based on your profile.");
      setCareerSuggestions([
        "Software Developer",
        "AI/ML Engineer",
        "UI/UX Designer",
        "Cybersecurity Analyst",
      ]);
      setShowSuggestions(true);
    } catch (error) {
      alert("❌ Error submitting form.");
      console.error(error);
    }
  };

  const generateResume = async () => {
    try {
      const token = getToken();

      const response = await fetch("http://localhost:5000/api/resume/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume.txt");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      alert("✅ Resume downloaded successfully.");
    } catch (err) {
      alert("❌ Failed to generate or download resume.\n" + err.message);
      console.error(err);
    }
  };

  const startMockInterview = async () => {
    try {
      const token = getToken();
      
      const res = await fetch("http://localhost:5000/api/interview/mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: "client"}),
      });

      const data = await res.json();
      console.log(data)
      alert("🎙️ Mock Interview Questions:\n\n" + data.interview);
    } catch (err) {
      console.log(err)
      alert("❌ Failed to fetch mock interview.");
      console.error(err);
    }
  };

  const analyzeSkillGap = async () => {
    try {
      const token = getToken();

      const res = await fetch("http://localhost:5000/api/skills/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          careerGoal: formData.careerGoals,
          currentSkills: formData.skills,
        }),
      });

      const data = await res.json();
      alert("📊 Skill Gap Analysis:\n\n" + data.suggestions);
    } catch (err) {
      alert("❌ Failed to analyze skills.");
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Smart Career Guidance & Resume Platform</h2>
        <p>Fill your details to get personalized career suggestions and resume tips.</p>

        <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
          <input type="text" name="degree" placeholder="Degree (e.g., B.Tech)" value={formData.degree} onChange={handleChange} required style={styles.input} />
          <input type="text" name="university" placeholder="University / College" value={formData.university} onChange={handleChange} required style={styles.input} />
          <input type="number" name="graduationYear" placeholder="Graduation Year" value={formData.graduationYear} onChange={handleChange} required style={styles.input} />
          <textarea name="skills" placeholder="Skills (e.g., JavaScript, Python)" value={formData.skills} onChange={handleChange} required style={styles.textarea} />
          <textarea name="interests" placeholder="Interests (e.g., Web Dev, AI)" value={formData.interests} onChange={handleChange} required style={styles.textarea} />
          <textarea name="experience" placeholder="Experience / Projects" value={formData.experience} onChange={handleChange} required style={styles.textarea} />
          <textarea name="certifications" placeholder="Certifications (AWS, Coursera etc.)" value={formData.certifications} onChange={handleChange} style={styles.textarea} />
          <textarea name="careerGoals" placeholder="Career Goals" value={formData.careerGoals} onChange={handleChange} style={styles.textarea} />

          <label style={styles.label}>Upload Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleProfileImageChange} style={styles.fileInput} />
          <label style={styles.label}>Upload Certificate (PDF):</label>
          <input type="file" accept=".pdf" onChange={handleCertificateFileChange} style={styles.fileInput} />

          <button type="submit" style={styles.button}>Get Career Suggestions</button>
        </form>

        {showSuggestions && (
          <>
            <div style={styles.suggestions}>
              <h3>Suggested Career Paths:</h3>
              <ul>
                {careerSuggestions.map((career, idx) => (
                  <li key={idx}>{career}</li>
                ))}
              </ul>
            </div>

            <div style={styles.greenFeatureButtons}>
              <button onClick={generateResume} style={styles.greenBtn}>Generate AI Resume</button>
              <button onClick={startMockInterview} style={styles.greenBtn}>Mock Interview</button>
              <button onClick={analyzeSkillGap} style={styles.greenBtn}>Skill Gap Analysis</button>
            </div>
          </>
        )}

        {/* ✅ Embedded Chatbot Section */}
        <div style={{ marginTop: "40px" }}>
          <h3>💬 Ask our AI Career Chatbot</h3>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(to right, #1c92d2, #f2fcfe)",
    minHeight: "100vh",
    padding: "40px 20px",
    color: "#333",
  },
  container: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "800px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    minHeight: "60px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  label: {
    marginTop: "10px",
    fontWeight: "600",
  },
  fileInput: {
    padding: "6px 0",
  },
  button: {
    padding: "14px",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "20px",
  },
  suggestions: {
    marginTop: "30px",
    background: "#f1f5f9",
    padding: "20px",
    borderRadius: "8px",
  },
  greenFeatureButtons: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  greenBtn: {
    padding: "10px 20px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Dashboard;
