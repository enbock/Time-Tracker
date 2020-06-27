#!/usr/bin/env bash

echo 0 >/tmp/changed

find ./build -name '*.js' | grep -v 'min.js' | while read file; do
  if ! grep '.js"' "$file" >/dev/null && grep 'import[^\\(]' "$file" >/dev/null; then
    echo "Correct $file..."
    relativeFilePath="$(echo "$file" | sed "s:^./build/:./:")"
    relativePathToRoot=$(dirname "$relativeFilePath" | sed "s:/[^/]*:/..:g")
    cat "$file" | sed 's:import \(.*\) from ["'\'']\@\([^"]*\)["'\'']:import \1 from "'"$relativePathToRoot"'/Libraries/\2":' >"$file".1
    cat "$file".1 | sed 's:import \(.*\) from ["'\'']\.\([^"]*\)["'\'']:import \1 from ".\2.js":' >"$file".2
    cat "$file".2 | sed 's:import \(.*\) from ["'\''][^\.].*::' >"$file".3
    cat "$file".3 | sed 's:./../:../:g' >"$file".final
    mv "$file".final "$file"
    rm "$file".*
    echo 1 >/tmp/changed
  fi
done

if test "$(cat /tmp/changed)" = "1" || grep "version = 'VERSION'" ./build/ServiceWorkerManager.js >/dev/null 2>/dev/null; then
  chmod +x ./scripts/indexFilesForServiceWorker.sh
  ./scripts/indexFilesForServiceWorker.sh
#else
#  echo "$(date): Nothing to update."
fi
