#!/bin/bash

./stop-docker.sh

d=''
if [ $# -ge 1 -a "$1" = "-d" ]; then
  d='-d'
fi

docker build -t songbridge .
docker run -p 8080:8080 --env-file .env $d songbridge
