const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/analyze", async (req, res) => {
  const { careerGoal, currentSkills } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a career advisor." },
        {
          role: "user",
          content: `I want to become a ${careerGoal}. I know ${currentSkills}. What skills should I learn to reach my goal?`,
        },
      ],
    });

    res.json({ suggestions: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI error (skills):", error.message);
    res.status(500).json({ error: "Failed to analyze skills." });
  }
});

module.exports = router;
