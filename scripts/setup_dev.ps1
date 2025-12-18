# MolView 360 - Development Setup Script (PowerShell)
# Run this script to set up your development environment

Write-Host "🧬 MolView 360 - Development Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Check for Node.js
Write-Host "`n📦 Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check for Python
Write-Host "`n🐍 Checking Python..." -ForegroundColor Yellow
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host "✅ $pythonVersion found" -ForegroundColor Green
} else {
    Write-Host "❌ Python not found. Please install Python 3.11+" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "`n📦 Installing frontend dependencies..." -ForegroundColor Yellow
Push-Location frontend
npm install
Pop-Location

# Install backend dependencies
Write-Host "`n📦 Installing backend dependencies..." -ForegroundColor Yellow
Push-Location backend
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
}
Pop-Location

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nTo start development:" -ForegroundColor Cyan
Write-Host "  Frontend: cd frontend && npm run dev"
Write-Host "  Backend:  cd backend && uvicorn app.main:app --reload"

