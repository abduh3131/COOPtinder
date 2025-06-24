# CareerSwipe

Mobile-first job application platform inspired by Tinder. Swipe through jobs, optimize your resume with OpenRouter AI, and track applications.

## Requirements

- [Node.js](https://nodejs.org/) 18 or later
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started on Windows 11

1. **Clone the repository**
   - Open VS Code and press `Ctrl+Shift+P`.
   - Choose **Git: Clone** and enter the repository URL.
   - Select a folder and open the project when cloning completes.
   - Navigate to the `careerswipe-app` folder in VS Code.

2. **Install dependencies**
   - Open the integrated terminal (**Terminal → New Terminal**).
   - Run:
     ```bash
     npm install
     ```

3. **Configure the OpenRouter API key**
   - In the project root, create a file named `.env.local`.
   - Add the line:
     ```
     NEXT_PUBLIC_OPENROUTER_API_KEY=your-key-here
     ```

4. **Start the development server**
   - Run:
     ```bash
     npm run dev
     ```
   - Open `http://localhost:3000` in your browser.

5. **Optional commands**
   - Lint the code:
     ```bash
     npm run lint
     ```
   - Build for production:
     ```bash
     npm run build
     ```

These steps let you test CareerSwipe locally on Windows 11 using Visual Studio Code.
