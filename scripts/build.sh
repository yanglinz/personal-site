#!/usr/bin/env bash
set -euox pipefail
IFS=$'\n\t'

yarn lerna run build
mv packages/core/public .
