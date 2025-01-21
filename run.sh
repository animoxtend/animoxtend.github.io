#!/usr/bin/env bash

set -e

# if "--dev" is passed as an argument, run the development server
if [[ "$*" == *"dev"* ]]; then
  COMPOSE_FILE=" -f dev.docker-compose.yaml"
fi

docker_up() {
  set -x
  docker compose $COMPOSE_FILE up
  set +x
}

docker_build() {
  set -x
  docker compose $COMPOSE_FILE build
  set +x
}

docker_push() {
  set -x
  docker compose $COMPOSE_FILE push
  set +x
}

docker_down() {
  set -x
  docker compose $COMPOSE_FILE down --volumes --remove-orphans
  set +x
}

case "$1" in
up)
  docker_up
  ;;
build)
  docker_build
  ;;
push)
  docker_push
  ;;
down)
  docker_down
  ;;
*)
  echo "Usage: $0 {up|build|push|down} [--dev]"
  exit 1
  ;;
esac
