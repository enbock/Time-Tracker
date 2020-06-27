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
cp -v node_modules/material-design-icons/iconfont/MaterialIcons-Regular.t* build/Font
cp -v node_modules/material-design-icons/iconfont/MaterialIcons-Regular.w* build/Font

# Hello Google Dev Team?!
cat node_modules/@material/auto-init/index.d.ts | uniq >node_modules/@material/auto-init/index.d.ts.patch
mv node_modules/@material/auto-init/index.d.ts.patch node_modules/@material/auto-init/index.d.ts

find "node_modules/@enbock" -name "*.js" | while read file; do
  target="$(echo "$file" | sed "s:^node_modules/@:build/Libraries/:")"
  mkdir -p "$(dirname "$target")"
  cp -v "$file" "$target"
done
