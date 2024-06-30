#!/bin/bash

set -e

cd ~/repos/fontanelle

git pull

docker compose build && docker compose up -d
