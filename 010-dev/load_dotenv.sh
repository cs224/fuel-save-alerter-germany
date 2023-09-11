#!/bin/bash

# mihow/load_dotenv.sh
# https://gist.github.com/mihow/9c7f559807069a03e302605691f85572
# set -o allexport
# source .env set
# set +o allexport

if [ ! -f .env ]
then
  export $(cat .env | xargs)
fi
