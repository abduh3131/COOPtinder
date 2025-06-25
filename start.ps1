$ErrorActionPreference = 'Stop'

# Path to the app directory relative to this script
$APP_DIR = Join-Path $PSScriptRoot 'careerswipe-app'

function Ensure-Node {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        return
    }
    Write-Host 'Node.js not found. Installing with winget...'
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Start-Process winget -Wait -ArgumentList 'install', '-e', '--id', 'OpenJS.NodeJS.LTS', '-h'
        $env:Path += ';C:\\Program Files\\nodejs'
    } else {
        throw 'winget is required to automatically install Node.js'
    }
}

Ensure-Node

# Move to application directory
Set-Location $APP_DIR

# Determine npm command
$npm = (Get-Command npm -ErrorAction SilentlyContinue).Source
if (-not $npm -and (Test-Path 'C:\\Program Files\\nodejs\\npm.cmd')) {
    $npm = 'C:\\Program Files\\nodejs\\npm.cmd'
}

# Install npm dependencies
Write-Host 'Installing dependencies...'
& $npm install

# Setup environment file
$envFile = '.env.local'
if (-not (Test-Path $envFile)) {
    Copy-Item '.env.example' $envFile -Force
    $key = Read-Host 'Enter your OpenRouter API key'
    (Get-Content $envFile) -replace 'your-openrouter-api-key', $key | Set-Content $envFile
}

# Start the development server
Write-Host 'Starting CareerSwipe...'
# Open the browser in a separate hidden PowerShell after a short delay so
# the dev server has time to start.
Start-Process powershell -WindowStyle Hidden -ArgumentList '-NoProfile -Command "Start-Sleep -Seconds 5; Start-Process http://localhost:3000"'
& $npm run dev -- -H 0.0.0.0 -p 3000
