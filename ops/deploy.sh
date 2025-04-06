#!/bin/bash

set -e

cd ~/repos/fontanelle

git pull

docker compose build && docker compose up -d

# Clean up unused docker resources to avoid cache buildup
docker system prune -af
