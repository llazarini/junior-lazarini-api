#!/bin/bash
git pull
pm2 stop ecosystem.config.js
yarn build --ignore-ts-errors
cd ./build 
cp ../.env.production ./.env

yarn install --production 
node ace migration:run --force

cd .. 

pm2 reload ecosystem.config.js 
