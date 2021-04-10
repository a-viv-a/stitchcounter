#!/usr/bin/env bash

echo "using npx and http-server to host files for development"

npx http-server src --cors -c-1 -p 9000