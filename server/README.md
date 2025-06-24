# COOPtinder Server

This is a minimal Express backend used for demo purposes. It stores user accounts and resumes in memory and exposes endpoints for registration, login, saving resumes, and requesting AI job recommendations. Normally the AI recommendations would use the OpenRouter API. If the environment variable `OPENROUTER_API_KEY` is not provided, placeholder jobs are returned.

## Running

```bash
npm install
npm start
```

The server listens on port `3000` by default.
