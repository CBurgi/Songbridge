#!/bin/bash
id=$( \
  docker ps --format "{{.ID}} {{.Image}}" \
  | grep "songbridge" \
  | cut -d " " -f1 \
)

if [ ! -z $id ]; then
  docker stop $id
  echo "Stopped container $id"
else
  echo "No container running..."
fi
