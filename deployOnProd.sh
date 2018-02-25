#!/usr/bin/env bash
cd /var/www/html/BackendTheatre
sudo rm -rf build
sudo rm -rf node_modules
git checkout .
npm install
sudo -R 777 chmod *
export NODE_ENV=production
"./node_modules/.bin/babel" -d ./build ./ -s
pm2 stop BackendTheatre
pm2 delete BackendTheatre
pm2 start build/bin/www.js --name "BackendTheatre"
