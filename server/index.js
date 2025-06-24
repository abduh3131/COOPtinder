import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const users = new Map();

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.has(username)) {
    return res.status(400).json({ message: 'User exists' });
  }
  users.set(username, { password, resume: '' });
  res.json({ message: 'Registered' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Logged in' });
});

app.post('/resume', (req, res) => {
  const { username, resume } = req.body;
  const user = users.get(username);
  if (!user) {
    return res.status(400).json({ message: 'Unknown user' });
  }
  user.resume = resume;
  res.json({ message: 'Resume saved' });
});

app.get('/resume/:username', (req, res) => {
  const user = users.get(req.params.username);
  if (!user) {
    return res.status(404).json({ message: 'Unknown user' });
  }
  res.json({ resume: user.resume });
});

async function aiRecommendJobs(resumeText) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    // Placeholder logic - normally call OpenRouter API here
    return ['Job A', 'Job B', 'Job C'];
  }
  try {
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [{ role: 'user', content: `Recommend jobs for resume: ${resumeText}` }]
      })
    });
    const data = await resp.json();
    return data.choices?.[0]?.message?.content?.split('\n');
  } catch (err) {
    console.error(err);
    return ['Error fetching recommendations'];
  }
}

app.post('/recommend', async (req, res) => {
  const { username } = req.body;
  const user = users.get(username);
  if (!user) {
    return res.status(400).json({ message: 'Unknown user' });
  }
  const jobs = await aiRecommendJobs(user.resume);
  res.json({ jobs });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
