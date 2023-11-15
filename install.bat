:: install.bat

@echo off

:: Telepíti a Laravel függőségeket
cd server
composer install
cd ..

:: Telepíti a React/Vite függőségeket
cd client/app
npm install
npm install bootstrap-icons
npm install react-icons/fa
npm install --save react-modal
npm install react-bootstrap@next
cd ../..