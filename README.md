# Story Mode — LLM-Powered Interactive Fiction

Story Mode is a web app that generates immersive, decision-based stories using an LLM (via OpenRouter). Users can start a unique story and continue it by typing custom responses. The story evolves with each input, creating a dynamic and personalized narrative.

---

## Features

- Powered by `mistral-7b-instruct` (Initially used GPT 4 but didn't want to spend money)
- Real-time LLM responses with memory of prior inputs
- Light/Dark mode toggle for better readability
- "New Story" button to start over at any time

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Create React App)
- **Backend**: Node.js, Express, OpenRouter API
- **LLM**: [OpenRouter](https://openrouter.ai/) (free tier available)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ChanakyaG2004/LLMStoryTellingApp.git
```

### 2. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

---

## API Key Setup

To run the backend, you'll need an [OpenRouter API key](https://openrouter.ai/):

1. Sign up at https://openrouter.ai
2. Go to your account and copy your API key (starts with `sk-or-`)
3. In the `/backend` folder, create a `.env` file:

```bash
cd backend
cp .env.example .env
```

Paste the following line into `.env`:

```
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
---

## Running the App Locally

In **two terminal windows**:

### Start the backend:
```bash
cd backend
node server.js
```

### Start the frontend:
```bash
cd frontend
npm start
```

Then go to [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

- The frontend collects your story input and sends it to the backend
- The backend calls OpenRouter's API with the conversation context
- The LLM responds with the next part of the story
- The frontend displays the new message and continues the flow

---

## Future Improvements

- Save/share stories
- User authentication
- Model selector (Mistral, GPT-4, Claude, etc.)
- Deployed version on Vercel/Render

---

## Author

**Chanakya Gidipally**  
[GitHub Profile](https://github.com/ChanakyaG2004)

---

## 📝 License

MIT — free to fork, use, and build on.
