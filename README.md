# COOPtinder

This repository contains **CareerSwipe**, a mobile-first job application built with Next.js.

For a quick start on Windows 11, **right‑click `start.bat` and choose "Run as Administrator"**. If Node.js isn't installed the script uses **winget** to fetch it. The script then installs dependencies, prompts for your OpenRouter API key, and launches the dev server. After a short delay your default browser opens <http://localhost:3000>.

If `localhost` networking is blocked on your machine you can build a completely offline version instead. Use `start-static.bat` which builds static files and opens them directly without starting a server.

You can reach the site from phones on the same Wi‑Fi at `http://<your-pc-ip>:3000` when using the dev server and install it as a PWA from the browser’s install option.

See [`careerswipe-app/`](careerswipe-app/) for the source code and more detailed instructions.
