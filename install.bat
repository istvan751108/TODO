@echo off

:: Telepíti a Laravel függőségeket
pushd server
call composer install
popd

:: Telepíti a React/Vite függőségeket
cd client
cd app
npm install bootstrap-icons react-icons --save react-modal react-bootstrap@next

:: Visszatér a kezdőkönyvtárba
cd ../..


