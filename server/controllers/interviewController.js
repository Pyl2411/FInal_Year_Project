const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const mockInterview = async (req, res) => {
  const { role } = req.body;

  try {
    const prompt = `Conduct a mock interview for the role of ${role}. Ask 5 technical and 2 HR questions.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 700,
    });

    res.json({ interview: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate mock interview", details: error.message });
  }
};

module.exports = { mockInterview };
