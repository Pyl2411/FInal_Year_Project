const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const analyzeSkills = async (req, res) => {
  const { careerGoal, currentSkills } = req.body;

  try {
    const prompt = `
      Analyze skill gaps. I want to become a ${careerGoal}. 
      My current skills are: ${currentSkills}. 
      What skills do I need to learn to achieve this goal?
    `;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 500,
    });

    res.json({ suggestions: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Skill gap analysis failed", details: error.message });
  }
};

module.exports = { analyzeSkills };
