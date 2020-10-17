@echo off
echo Starting Installation Frontend

echo Frontend
cd frontend
call npm install
call npm run build

echo Backend
cd ..
call npm install
call npm run start:dev
