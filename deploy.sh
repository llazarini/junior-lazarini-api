#!/bin/bash

git pull
pm2 stop ecosystem.config.js
yarn
yarn build --ignore-ts-errors
cd ./build 
cp ../.env.production ./.env

yarn install --production 
node ace migration:run --force

cd .. 

# Make dirs
mkdir /opt/junior-lazarini-api/build/tmp/
mkdir /opt/junior-lazarini-api/build/tmp/uploads

pm2 reload ecosystem.config.js 
