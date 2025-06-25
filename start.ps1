$ErrorActionPreference = 'Stop'

# Path to the app directory relative to this script
$APP_DIR = Join-Path $PSScriptRoot 'careerswipe-app'

# Ensure Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host 'Node.js not found. Attempting to install with winget...'
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        winget install -e --id OpenJS.NodeJS.LTS
    } else {
        Write-Warning 'winget not available. Please install Node.js 18 or later.'
    }
}

# Move to application directory
Set-Location $APP_DIR

# Install npm dependencies
Write-Host 'Installing dependencies...'
npm install

# Setup environment file
$envFile = '.env.local'
if (-not (Test-Path $envFile)) {
    Copy-Item '.env.example' $envFile -Force
    $key = Read-Host 'Enter your OpenRouter API key'
    (Get-Content $envFile) -replace 'your-openrouter-api-key', $key | Set-Content $envFile
}

# Start the development server
Write-Host 'Starting CareerSwipe...'
Start-Process 'http://localhost:3000'
npm run dev -- -H 0.0.0.0 -p 3000
