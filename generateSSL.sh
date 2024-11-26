#!/bin/bash

apt update
apt install certbot
certbot certonly --standalone -d gsc.harjotbasota.com
APP_DIR = $(dirname "$(realpath "$0")")

mkdir "$APP_DIR/api/certs"
cd "$APP_DIR/api/certs"
cp /etc/letsencrypt/live/gsc.harjotbasota.com/privkey.pem .
cp /etc/letsencrypt/live/gsc.harjotbasota.com/fullchain.pem .

mkdir "$APP_DIR/frontend/nginx/certs"
cd "$APP_DIR/frontend/nginx/certs"
cp /etc/letsencrypt/live/gsc.harjotbasota.com/privkey.pem .
cp /etc/letsencrypt/live/gsc.harjotbasota.com/fullchain.pem .

echo "SSL certificated issued and successfully attached to nginx"