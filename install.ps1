# install.ps1

# Telepíti a Laravel függőségeket
Set-Location -Path .\server
composer install
Set-Location -Path ..

# Telepíti a React/Vite függőségeket
Set-Location -Path .\client\app
npm install
npm install bootstrap-icons
npm install react-icons
npm install --save react-modal
npm install react-bootstrap@next
Set-Location -Path ..\..

# Végrehajtja a Laravel adatbázis migrációkat
Set-Location -Path .\server
php artisan migrate
Set-Location -Path ..\..