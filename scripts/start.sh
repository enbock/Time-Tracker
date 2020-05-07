#!/usr/bin/env bash

DIR=$(pwd)

rm -rf cd $DIR/build 2>/dev/null
./scripts/copyFiles.sh develop
while sleep 1; do ./scripts/correctImports.sh; done &

cd $DIR/build
npx http-server > $DIR/build/http.log 2>&1 &
cd $DIR

npx tsc --build tsconfig.json -w
