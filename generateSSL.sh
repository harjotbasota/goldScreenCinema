#!/bin/bash

apt update
apt install certbot
read -p "Enter the domain name (e.g., www.google.com): " DOMAIN_NAME
sudo certbot certonly --standalone -d "$DOMAIN_NAME"
SCRIPT_DIR="$(dirname "$(realpath "$0")")"

mkdir $SCRIPT_DIR/api/certs
cd "./api/certs"
cp /etc/letsencrypt/live/gsc.harjotbasota.com/privkey.pem .
cp /etc/letsencrypt/live/gsc.harjotbasota.com/fullchain.pem .

mkdir $SCRIPT_DIR/frontend/nginx/certs
cd "./frontend/nginx/certs"
cp /etc/letsencrypt/live/gsc.harjotbasota.com/privkey.pem .
cp /etc/letsencrypt/live/gsc.harjotbasota.com/fullchain.pem .

echo "SSL certificated issued and successfully attached to nginx"