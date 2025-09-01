SHELL := /usr/bin/bash

.PHONY: up down logs build bootstrap shell artisan npm

up:
	docker compose up -d --build

down:
	docker compose down -v

logs:
	docker compose logs -f --tail=200

bootstrap:
	docker compose exec php bash -lc "/workspace/ops/bin/bootstrap.sh"

shell:
	docker compose exec php bash

artisan:
	docker compose exec php php artisan $(cmd)

npm:
	docker compose exec php bash -lc "npm run $(script)"
