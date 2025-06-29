import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting the AI service." },
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.container}>
      <h3>🎓 Career Guidance Chatbot</h3>
      <div style={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.msg,
              textAlign: msg.sender === "user" ? "right" : "left",
              color: msg.sender === "user" ? "#2c3e50" : "#006400",
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about careers, skills, courses..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    border: "2px solid #007bff",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  chatWindow: {
    height: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    background: "white",
    marginBottom: "10px",
  },
  msg: {
    marginBottom: "8px",
  },
  input: {
    width: "75%",
    padding: "8px",
    marginRight: "5px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Chatbot;
