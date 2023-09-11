
SHELL := /bin/bash

run_compose_up:
	docker compose up

run_compose_stop:
	docker compose stop

# !! WILL DELETE THE CONTAINERS INCLUDING THE VOLUMES !!
run_compose_down:
	docker compose down -v --remove-orphans # --rmi all

run_nodered_compose_up:
	docker compose -f docker-compose-node-red.yml up

# https://stackoverflow.com/questions/4348590/how-can-i-make-git-ignore-future-revisions-to-a-file
# https://sodocumentation.net/git/topic/245/ignoring-files-and-folders
freeze_data:
	git ls-files -z data | xargs -0 git update-index --skip-worktree

unfreeze_data:
	git ls-files -z data | xargs -0 git update-index --no-skip-worktree

set-up-env:
	set -o allexport && source .env set && set +o allexport && echo $$LATITUDE && echo $$LONGITUDE && echo $$RADIUS && echo $$APIKEY

curl-test:
	curl -s -X GET -G "https://creativecommons.tankerkoenig.de/json/list.php" -d lat=$$LATITUDE -d lng=$$LONGITUDE -d rad=$$RADIUS -d sort=dist -d type=all -d apikey=$$APIKEY | jq .


