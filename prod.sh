#!/bin/bash
pm2 stop ecosystem.config.js
cp .env.production .env
yarn
yarn build --ignore-ts-errors
cp .env.production ./build/.env 
cd ./build
yarn install --production
node ace migration:run --force
cd .. && pm2 reload ecosystem.config.js


