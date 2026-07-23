# Deployment steps
cd laradock
docker compose exec workspace bash
ls

# php commands
php artisan migrate
php artisan cache:clear
php artisan cookie:clear

# vite command
npm update 
yarn build
exit
docker compose restart
