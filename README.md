# COOPtinder

This repository contains a simple proof of concept for a cross-platform job matching application. It includes:

- **server** – an Express backend with endpoints for user registration, login, resume storage, and AI-driven job recommendations (via the OpenRouter API or placeholder results).
- **mobile** – a minimal React Native client built with Expo that communicates with the server.

Both pieces are intentionally lightweight and intended as starting points only.

## Running

1. Start the server

   ```bash
   cd server
   npm install
   npm start
   ```

2. Start the mobile app

   ```bash
   cd mobile
   npm install
   npm start
   ```

You will need the Expo CLI installed globally (`npm install -g expo-cli`) to run the mobile app on iOS or Android simulators/devices.
