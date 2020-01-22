#!/usr/bin/env bash

find ./build -name '*.js' | while read file
do
  if ! grep '.js"' "$file" && grep 'import' "$file"
  then
    sed -i 's:import \(.*\) from ["'\'']\.\([^"]*\)["'\'']:import \1 from ".\2.js":' "$file"
    sed -i 's:import \(.*\) from ["'\''][^\.].*::' "$file"
  fi
done
