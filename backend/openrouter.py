import os
import requests

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def ask_openrouter(messages):
    """Send chat messages to OpenRouter API and return response text."""
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY environment variable not set")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "openrouter/gpt-3.5-turbo",  # example model
        "messages": messages,
    }
    resp = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    return data["choices"][0]["message"]["content"]
