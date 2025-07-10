const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/api/story', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'LLM-Story-App'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages,
        temperature: 0.9
      })
    });

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ error: 'No response from model' });
    }

    res.json({ message: data.choices[0].message });
  } catch (error) {
    console.error("OpenRouter API error:", error);
    res.status(500).json({ error: 'Failed to contact OpenRouter API' });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend is listening at http://localhost:${port}`);
});
