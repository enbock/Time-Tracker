#!/usr/bin/env bash

mkdir -p build/Libraries

echo "Copy public files..."
cp -r public/* build/

echo "Copy Libraries..."

reactFile=react.development.js
reactDomFile=react-dom.development.js
mdcJs=material-components-web.js
mdcCss=material-components-web.css

if test "$1" = "production"; then
  reactFile=react.production.min.js
  reactDomFile=react-dom.production.min.js
  mdcJs=material-components-web.min.js
  mdcCss=material-components-web.min.css
fi

cp -v "node_modules/react/umd/$reactFile" build/Libraries/react.min.js
cp -v "node_modules/react-dom/umd/$reactDomFile" build/Libraries/react-dom.min.js
cp -v "node_modules/material-components-web/dist/$mdcJs" build/Libraries/material-components-web.min.js
cp -v "node_modules/material-components-web/dist/$mdcCss" build/Style/material-components-web.min.css
cp -v node_modules/material-design-icons/iconfont/MaterialIcons-Regular.{woff2,woff,ttf} build/Font
