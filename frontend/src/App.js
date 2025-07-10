import React, { useState, useEffect } from 'react';
import './App.css';

const systemPrompt = {
  role: 'system',
  content: `You are an immersive storytelling engine. Generate gripping story scenes in response to user input. Do not 
            give options for the user, let the user give their own response.`,
};

function App() {
  const [messages, setMessages] = useState([systemPrompt]);
  const [story, setStory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const sendMessage = async (userInput) => {
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3005/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!data.message || !data.message.content) {
        alert("❌ Backend response malformed");
        setLoading(false);
        return;
      }

      const reply = data.message;
      setMessages([...newMessages, reply]);
      setStory(prev => [...prev, `🧑‍💬 You: ${userInput}`, `🤖 ${reply.content}`]);
    } catch (err) {
      alert("❌ Error fetching from backend");
      console.error(err);
    }

    setLoading(false);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
    }
  };

  const startNewStory = async () => {
    const prompt = "Generate the beginning of an immersive, interactive story. End with a prompt for the user.";
    const initialMessages = [systemPrompt, { role: 'user', content: prompt }];
    setMessages(initialMessages);
    setStory([]);
    setHasStarted(true);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3005/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: initialMessages }),
      });

      const data = await res.json();
      if (data.message?.content) {
        setMessages([...initialMessages, data.message]);
        setStory([`🤖 ${data.message.content}`]);
      } else {
        alert("Error: no story returned");
      }
    } catch (err) {
      console.error("Failed to fetch intro:", err);
      alert("Failed to start story.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </div>

      <h1>Create Your Own Story!</h1>

      {!hasStarted && (
        <button onClick={startNewStory}>Start New Story</button>
      )}

      {story.map((text, i) => (
        <div key={i} className="story-block">{text}</div>
      ))}

      {loading && <p>Loading...</p>}

      {hasStarted && !loading && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you do next?"
            />
            <button type="submit">Send</button>
          </form>

          <button
            className="secondary-btn"
            onClick={() => {
              setMessages([systemPrompt]);
              setStory([]);
              setInput('');
              setHasStarted(false);
            }}
            style={{ marginTop: '1rem' }}
          >
            🔄 New Story
          </button>
        </>
      )}
    </div>
  );
}
console.log("🔑 API Key Loaded:", process.env.OPENROUTER_API_KEY ? "✅ Loaded" : "❌ Missing");


export default App;
