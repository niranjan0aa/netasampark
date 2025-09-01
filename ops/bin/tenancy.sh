#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

if [ ! -f artisan ]; then
  echo "Laravel not initialized. Run bootstrap first." >&2
  exit 1
fi

echo "[tenancy] Installing stancl/tenancy..."
composer require stancl/tenancy:^4.0

echo "[tenancy] Publishing config & migrations..."
php artisan vendor:publish --provider=\"Stancl\\Tenancy\\TenancyServiceProvider\" --tag=tenancy-config
php artisan vendor:publish --provider=\"Stancl\\Tenancy\\TenancyServiceProvider\" --tag=tenancy-migrations

echo "[tenancy] Running migrations..."
php artisan migrate

echo "[tenancy] Done. Configure domains and middleware as needed."
