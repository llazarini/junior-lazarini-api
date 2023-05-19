#!/bin/bash
git pull
yarn build 
cd ./build 
yarn install --production 
cp ../.env.production ./.env
cd .. 
pm2 reload ecosystem.config.js 