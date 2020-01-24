#!/usr/bin/env bash

find ./build -name '*.js' | while read file
do
  if ! grep '.js"' "$file" > /dev/null && grep 'import' "$file" > /dev/null
  then
    echo "Correct $file..."
    sed -i 's:import \(.*\) from ["'\'']\.\([^"]*\)["'\'']:import \1 from ".\2.js":' "$file"
    sed -i 's:import \(.*\) from ["'\''][^\.].*::' "$file"
  fi
done
