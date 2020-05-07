#!/usr/bin/env bash

echo 0 >/tmp/changed

find ./build -name '*.js' | grep -v 'min.js' | while read file; do
  if ! grep '.js"' "$file" >/dev/null && grep 'import[^\\(]' "$file" >/dev/null; then
    echo "Correct $file..."
    cat "$file" | sed 's:import \(.*\) from ["'\'']\.\([^"]*\)["'\'']:import \1 from ".\2.js":' > "$file".1
    cat "$file".1 | sed 's:import \(.*\) from ["'\''][^\.].*::' > "$file".2
    mv "$file".2 "$file"
    rm "$file".1
    echo 1 >/tmp/changed
  fi
done

if test "$(cat /tmp/changed)" = "1" || grep "version = 'VERSION'" ./build/ServiceWorkerManager.js > /dev/null 2>/dev/null; then
  chmod +x ./scripts/indexFilesForServiceWorker.sh
  ./scripts/indexFilesForServiceWorker.sh
fi
