#!/usr/bin/env bash

sh scripts/copyFiles.sh production
npx tsc --build tsconfig.json -v
sh scripts/correctImports.sh