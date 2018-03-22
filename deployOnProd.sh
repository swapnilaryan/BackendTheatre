#!/usr/bin/env bash
cd /var/www/html/BackendTheatre
sudo rm -rf build
sudo rm -rf node_modules
sudo git checkout .
sudo git pull
yarn install
sudo chmod -R 777 *
export NODE_ENV=production
"./node_modules/.bin/babel" -d ./build ./ -s
pm2 stop BackendTheatre
pm2 delete BackendTheatre
pm2 start build/bin/www.js --name "BackendTheatre"
