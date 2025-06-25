# CareerSwipe

Mobile-first job application platform inspired by Tinder. Swipe through jobs, optimize your resume with OpenRouter AI, and track applications.

## Quick Start

On Windows 11 you can simply run `../start.bat` from the repository root. **Right‑click and choose "Run as Administrator"** so the script can install Node.js via **winget** if needed. It then installs dependencies, prompts for your OpenRouter API key, and launches the dev server. After a short delay it opens `http://localhost:3000` in your browser and you can "Install" the site to run it like a native app.
If `localhost` isn't available, run `../start-static.bat` instead. This builds static files and opens `out/index.html` directly so no server is needed.
If you want to test on a phone, connect both devices to the same network and visit `http://<your-pc-ip>:3000` from the mobile browser when using the dev server.
Use the browser's "Add to Home screen" or "Install" option to save CareerSwipe as a standalone app.

## Manual Setup

1. **Clone the repository**
   - Open VS Code and press `Ctrl+Shift+P`.
   - Choose **Git: Clone** and enter the repository URL.
   - Select a folder and open the project when cloning completes.
   - Navigate to the `careerswipe-app` folder in VS Code.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the OpenRouter API key**
   - Copy `.env.example` to `.env.local`.
   - Edit `.env.local` and replace `your-openrouter-api-key` with your actual key:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY=your-openrouter-api-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.
   You can also connect from a phone on the same network using `http://<your-pc-ip>:3000`.
   Once open, choose the browser's install option to add CareerSwipe as a PWA.

5. **Optional commands**
   - Lint the code: `npm run lint`
   - Build for production: `npm run build`

These steps let you test CareerSwipe locally on Windows 11 using Visual Studio Code.

## Styling

CareerSwipe uses **Tailwind CSS** with a color palette inspired by TD Bank:

- Primary Green `#009A44`
- Accent Green `#00B14F`
- White background `#FFFFFF`
- Dark text `#1C1C1C`

All pages are mobile-first and should show rounded cards and green buttons once Tailwind compiles correctly. If you see an unstyled page, ensure `npm install` completed without errors.
