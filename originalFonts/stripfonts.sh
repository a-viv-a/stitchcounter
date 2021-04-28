#!/usr/bin/env bash

echo 'removing unneeded chars from fonts'
pyftsubset lexend-v2-latin-regular.woff --output-file=../src/fonts/lexend-v2-stripped-regular.woff --text="0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-!." --with-zopfli
pyftsubset lexend-v2-latin-regular.woff2 --output-file=../src/fonts/lexend-v2-stripped-regular.woff2 --text="0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-!." --flavor=woff2