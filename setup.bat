@echo off
python -m pip install -r backend\requirements.txt

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js is required. Please install it from https://nodejs.org/
) else (
    npm install -g expo-cli
)
echo Setup complete.
set /p OPENROUTER_API_KEY=Enter your OpenRouter API key:
echo Starting application...
python run_app.py

