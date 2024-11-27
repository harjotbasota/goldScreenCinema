#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/api/certs
cp /etc/letsencrypt/live/gsc.harjotbasota.com/privkey.pem .
cp /etc/letsencrypt/live/gsc.harjotbasota.com/fullchain.pem .

cd $SCRIPT_DIR/frontend/nginx/certs
cp /etc/letsencrypt/live/gsc.harjotbasota.com/privkey.pem .
cp /etc/letsencrypt/live/gsc.harjotbasota.com/fullchain.pem .

echo "SSL certificated files are updated"