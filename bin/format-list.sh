#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

git ls-files | egrep '\.json$|\.html$|\.js|\.ts|\.tsx|\.astro$|\.md$'
