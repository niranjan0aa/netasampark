NetaSampark - Production Scaffold
================================

Prerequisites: Docker + Docker Compose.

Quick start
-----------

1) Start services

```
make up
```

2) Bootstrap Laravel inside container (creates app in `backend/`)

```
make bootstrap
```

3) Open

- App: http://localhost:8080
- Mailhog: http://localhost:8025
- MinIO: http://localhost:9001 (user/pass: minioadmin/minioadmin)
- Meilisearch: http://localhost:7700

Handy
-----

- Shell: `make shell`
- Artisan: `make artisan cmd="migrate"`
- Logs: `make logs`

Notes
-----

- The `bootstrap` step installs Laravel 11, Breeze (Inertia React), sets `.env`, builds assets, and migrates.
- Next steps: run `ops/bin/tenancy.sh` to add stancl/tenancy, then add modules.