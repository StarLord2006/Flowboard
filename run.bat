@echo off
echo Starting FlowBoard...
echo.
echo Open your browser at: http://localhost:8080
echo Press Ctrl+C to stop the app.
echo.
cd /d "%~dp0"
mvn spring-boot:run
pause
