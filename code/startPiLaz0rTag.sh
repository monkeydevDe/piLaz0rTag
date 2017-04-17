#!/bin/bash
echo "Starting piLaz0rTag via nodemon";
export DEBUG=piLazorTag;
node_modules/.bin/nodemon --ignore modules/web/assets piLaz0rTag.js;

