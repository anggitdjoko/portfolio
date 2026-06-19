@echo off
echo Building project...
call npm run build
if %errorlevel% neq 0 (
    echo BUILD FAILED! Check errors above.
    pause
    exit /b 1
)
echo BUILD SUCCESS! Pushing to GitHub...
git add -A
git commit -m "Auto-build: %date% %time%"
git push origin main
echo Deployed! Check https://portfolio.vercel.app in 2-3 minutes.
pause
