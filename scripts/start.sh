#!/usr/bin/env bash

DIR=$(pwd)

./scripts/copyFiles.sh develop
cd $DIR/build
npx http-server &
cd $DIR
while sleep 10; do ./scripts/correctImports.sh; done &
npx tsc --build tsconfig.json -w
