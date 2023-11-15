:: install.bat

@echo off

:: Telepíti a Laravel függőségeket
cd server
composer install
cd ..

:: Telepíti a React/Vite függőségeket
cd client/app
npm install
cd ../..