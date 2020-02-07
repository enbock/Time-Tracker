#!/usr/bin/env bash

echo 0 >/tmp/changed

find ./build -name '*.js' | while read file; do
  if ! grep '.js"' "$file" >/dev/null && grep 'import[^\\(]' "$file" >/dev/null; then
    echo "Correct $file..."
    sed -i 's:import \(.*\) from ["'\'']\.\([^"]*\)["'\'']:import \1 from ".\2.js":' "$file"
    sed -i 's:import \(.*\) from ["'\''][^\.].*::' "$file"
    echo 1 >/tmp/changed
  fi
done

if test "$(cat /tmp/changed)" = "1"; then
  chmod +x ./scripts/indexFilesForServiceWorker.sh
  ./scripts/indexFilesForServiceWorker.sh
fi
