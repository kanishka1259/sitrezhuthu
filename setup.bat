@echo off
REM Portfolio Generator - Setup Script for Windows

echo 🚀 Portfolio Generator Setup
echo ============================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
  exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected
echo.

REM Copy environment template
if not exist .env.local (
  echo 📝 Creating .env.local from .env.example...
  copy .env.example .env.local
  echo ✅ .env.local created. Please update it with your secrets.
) else (
  echo ✅ .env.local already exists
)

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update .env.local with your configuration
echo 2. Run 'npm run dev' to start the development server
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📚 For detailed setup instructions, see README.md
