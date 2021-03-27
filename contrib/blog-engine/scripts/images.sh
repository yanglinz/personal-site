#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

mkdir -p public && \
  rm -rf public/content && \
  cp -r content public/content
