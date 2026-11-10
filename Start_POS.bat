@echo off
title SHORjs POS - Computer Storage
color 0A
cd /d "%~dp0"
echo =======================================================
echo          Starting SHORjs POS System...
echo    Data will be saved into: data.json on your PC
echo =======================================================
echo.
start "" "http://localhost:3000"
node server.js
pause

