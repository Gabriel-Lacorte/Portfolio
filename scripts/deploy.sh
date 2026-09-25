#!/usr/bin/env bash
# Builds the site and ships it to the pi: files, nginx config, reload.
# Usage: npm run deploy -- [user@host]   (default: user@pi)
set -euo pipefail

HOST="${1:-user@pi}"
WEBROOT=/var/www/lacort.ee

npm run build

tar -czf site.tar.gz -C dist .
trap 'rm -f site.tar.gz' EXIT

scp -q site.tar.gz deploy/nginx.conf deploy/headers.conf "$HOST":~
ssh -t "$HOST" "
  set -e
  sudo mkdir -p $WEBROOT
  sudo tar -xzf ~/site.tar.gz -C $WEBROOT
  sudo cp ~/headers.conf /etc/nginx/snippets/lacort.ee-headers.conf
  sudo cp ~/nginx.conf /etc/nginx/sites-available/lacort.ee
  sudo nginx -t
  sudo systemctl reload nginx
  rm -f ~/site.tar.gz ~/headers.conf ~/nginx.conf
  curl -sI http://localhost/ | head -1
"
