@echo off
echo ========================================
echo    HomeChef Full Stack Application
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Seeding database with sample data...
call npm run seed
if %errorlevel% neq 0 (
    echo WARNING: Database seeding failed. Make sure MongoDB is running.
    echo You can run 'npm run seed' later manually.
)

echo.
echo [3/4] Starting backend server...
echo Backend will start on http://localhost:5000
echo.
echo [4/4] Instructions:
echo - Backend server will start in a new window
echo - Open frontend/index.html in your browser
echo - Or navigate to frontend folder and open form.html for booking
echo.
echo Press any key to start the server...
pause > nul

start "HomeChef Backend" cmd /k "npm run dev"

echo.
echo ========================================
echo Backend server started successfully!
echo.
echo Next steps:
echo 1. Open your web browser
echo 2. Navigate to the frontend folder
echo 3. Open index.html for main page
echo 4. Open form.html for booking page
echo.
echo API is running at: http://localhost:5000
echo API Test page: backend/api-test.html
echo ========================================
echo.
pause