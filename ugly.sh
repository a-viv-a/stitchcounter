#!/usr/bin/env bash

npx terser -c drop_console -m --mangle-props reserved=[increment,stitches,cRowStitches,counters,name,lversion] --module -o src/index.js -- src/index.js
npx terser -c drop_console -m --module -o src/sw.js -- src/sw.js
npx clean-css-cli -o src/main.css src/main.css
npx html-minifier-terser --collapse-whitespace --remove-comments --collapse-boolean-attributes src/index.html --output src/index.html
