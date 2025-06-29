const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/mock", async (req, res) => {
  const { role } = req.body;
  console.log(role)
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are an interviewer for the role of ${role}` },
        { role: "user", content: `Give me 5 mock interview questions for a ${role}.` },
      ],
    });

    res.json({ interview: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI error (mock):", error.message);
    res.status(500).json({ error: "Failed to fetch mock interview." });
  }
});

module.exports = router;
