import React from "react";

const Resume = () => {
  const handleGenerate = () => {
    alert("Resume generation logic will go here (PDF download).");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Resume Generator</h2>
      <button onClick={handleGenerate}>Download Resume as PDF</button>
    </div>
  );
};

export default Resume;
