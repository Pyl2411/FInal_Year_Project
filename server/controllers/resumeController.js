// If using OpenAI: npm install openai axios
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Add this to your .env
});

const openai = new OpenAIApi(config);

const generateResume = async (req, res) => {
  const { fullName, email, skills, experience, education, goals } = req.body;

  try {
    const prompt = `
      Generate a professional resume for the following details:
      Name: ${fullName}
      Email: ${email}
      Skills: ${skills}
      Experience: ${experience}
      Education: ${education}
      Career Goals: ${goals}
    `;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 800,
    });

    res.json({ resume: completion.data.choices[0].text });
  } catch (err) {
    res.status(500).json({ error: "Resume generation failed", details: err.message });
  }
};

module.exports = { generateResume };
