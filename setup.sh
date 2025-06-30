#!/bin/bash
set -e

# Install Python packages
python3 -m pip install -r backend/requirements.txt

# Install Node and Expo CLI for React Native
if ! command -v node >/dev/null; then
    echo "Node.js is required. Please install it from https://nodejs.org/" >&2
else
    npm install -g expo-cli
fi

echo "Setup complete."
