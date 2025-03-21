#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

git ls-files | egrep '\.json$|\.html$|\.css|\.js|\.mjs|\.ts|\.tsx|\.astro$|\.md$'
