#!/usr/bin/env bash

mkdir -p build/Libraries

echo "Copy public files..."
cp -r public/* build/

echo "Copy Libraries..."

reactFile=react.development.js
reactDomFile=react-dom.development.js

if test "$1" = "production"
then
  reactFile=react.production.min.js
  reactDomFile=react-dom.production.min.js
fi

cp -v "node_modules/react/umd/$reactFile" build/Libraries/react.min.js
cp -v "node_modules/react-dom/umd/$reactDomFile" build/Libraries/react-dom.min.js