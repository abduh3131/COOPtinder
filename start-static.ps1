$ErrorActionPreference = 'Stop'

# Path to the app directory relative to this script
$APP_DIR = Join-Path $PSScriptRoot 'careerswipe-app'

function Ensure-Node {
    if (Get-Command node -ErrorAction SilentlyContinue) { return }
    Write-Host 'Node.js not found. Installing with winget...'
    $admin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    if (-not $admin) {
        Write-Warning 'Please run start-static.bat from an elevated prompt so winget can install Node.js.'
        exit 1
    }
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Start-Process winget -Wait -ArgumentList 'install', '-e', '--id', 'OpenJS.NodeJS.LTS', '-h'
        $env:Path += ';C:\Program Files\nodejs'
    } else {
        throw 'winget is required to automatically install Node.js'
    }
}

Ensure-Node

Set-Location $APP_DIR

$npm = (Get-Command npm -ErrorAction SilentlyContinue).Source
if (-not $npm -and (Test-Path 'C:\Program Files\nodejs\npm.cmd')) {
    $npm = 'C:\Program Files\nodejs\npm.cmd'
}

Write-Host 'Installing dependencies...'
& $npm install

$envFile = '.env.local'
if (-not (Test-Path $envFile)) {
    Copy-Item '.env.example' $envFile -Force
    $key = Read-Host 'Enter your OpenRouter API key'
    (Get-Content $envFile) -replace 'your-openrouter-api-key', $key | Set-Content $envFile
}

Write-Host 'Building static files...'
& $npm run build:static

$index = Join-Path $APP_DIR 'out/index.html'
Write-Host "Opening $index"
Start-Process $index
