#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

mkdir -p public && cp -r content public/content
