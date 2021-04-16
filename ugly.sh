#!/usr/bin/env bash

terser -c drop_console -m --mangle-props reserved=[increment,stitches,cRowStitches] --module -o src/index.js -- src/index.js
terser -c drop_console -m --module -o src/sw.js -- src/sw.js
cleancss -o main.css main.css