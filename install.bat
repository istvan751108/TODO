@echo off

:: Telepíti a Laravel függőségeket
pushd server
call composer install
popd

:: Létrehozza a start.bat fájlt
echo @echo off > start.bat
echo cd server >> start.bat
echo start /B php artisan serve >> start.bat
echo cd ../client/app >> start.bat
echo start /B npm run dev >> start.bat
echo start http://localhost:5173/ >> start.bat

:: Telepíti a React/Vite függőségeket
cd client
cd app
npm install bootstrap-icons react-icons --save react-modal react-bootstrap@next








