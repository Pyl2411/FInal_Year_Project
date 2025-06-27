// src/pages/MockInterview.js
import React, { useState } from "react";

const questions = [
  "What is the difference between let, const, and var in JavaScript?",
  "Explain the concept of promises and async/await.",
  "What is the virtual DOM in React?",
  "How do you optimize a React app's performance?",
];

const MockInterview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (e) => {
    const updated = [...answers];
    updated[currentQuestion] = e.target.value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Mock Interview Practice</h2>

        {!submitted ? (
          <>
            <p><strong>Q{currentQuestion + 1}:</strong> {questions[currentQuestion]}</p>
            <textarea
              value={answers[currentQuestion]}
              onChange={handleAnswerChange}
              style={styles.textarea}
              placeholder="Type your answer here..."
            />
            <button style={styles.button} onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </>
        ) : (
          <>
            <h4>Your Answers:</h4>
            <ul>
              {answers.map((ans, idx) => (
                <li key={idx}><strong>Q{idx + 1}:</strong> {questions[idx]}<br />👉 <em>{ans || "Not answered"}</em></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    background: "#f9fafc",
    minHeight: "100vh",
  },
  container: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    maxWidth: "700px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "10px",
    marginTop: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default MockInterview;
