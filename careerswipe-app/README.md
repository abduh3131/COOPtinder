# CareerSwipe

Mobile-first job application platform inspired by Tinder. Swipe through jobs, optimize your resume with OpenRouter AI, and track applications.

## Quick Start

On Windows 11 you can simply run `../start.bat` from the repository root. The script automatically installs Node.js with **winget** if needed, installs dependencies, prompts for your OpenRouter API key, and launches the dev server. If Node had to be installed the script updates your `PATH` before continuing. After a short delay it opens `http://localhost:3000` in your browser.
If you want to test on a phone, connect both devices to the same network and visit `http://<your-pc-ip>:3000` from the mobile browser.

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

5. **Optional commands**
   - Lint the code: `npm run lint`
   - Build for production: `npm run build`

These steps let you test CareerSwipe locally on Windows 11 using Visual Studio Code.
