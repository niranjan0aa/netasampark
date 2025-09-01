#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/html"

cd "$APP_DIR"

if [ ! -f artisan ]; then
  echo "[bootstrap] Creating new Laravel app..."
  composer create-project laravel/laravel .
fi

echo "[bootstrap] Installing backend PHP dependencies..."
composer require laravel/sanctum laravel/scout meilisearch/meilisearch-php meilisearch/scout-driver predis/predis laravel/horizon spatie/laravel-permission spatie/laravel-activitylog inertiajs/inertia-laravel

if ! grep -q "^BROADCAST_DRIVER" .env 2>/dev/null; then
  cp .env.example .env || true
fi

php artisan key:generate || true

echo "[bootstrap] Configuring .env for Docker stack..."
sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=pgsql/' .env
sed -i 's/^DB_HOST=.*/DB_HOST=db/' .env
sed -i 's/^DB_PORT=.*/DB_PORT=5432/' .env
sed -i 's/^DB_DATABASE=.*/DB_DATABASE=netasamp/' .env
sed -i 's/^DB_USERNAME=.*/DB_USERNAME=postgres/' .env
sed -i 's/^DB_PASSWORD=.*/DB_PASSWORD=postgres/' .env

grep -q '^QUEUE_CONNECTION=' .env && sed -i 's/^QUEUE_CONNECTION=.*/QUEUE_CONNECTION=redis/' .env || echo 'QUEUE_CONNECTION=redis' >> .env
grep -q '^CACHE_STORE=' .env && sed -i 's/^CACHE_STORE=.*/CACHE_STORE=redis/' .env || echo 'CACHE_STORE=redis' >> .env
grep -q '^SCOUT_DRIVER=' .env && sed -i 's/^SCOUT_DRIVER=.*/SCOUT_DRIVER=meilisearch/' .env || echo 'SCOUT_DRIVER=meilisearch' >> .env
grep -q '^MEILISEARCH_HOST=' .env && sed -i 's#^MEILISEARCH_HOST=.*#MEILISEARCH_HOST=http://meilisearch:7700#' .env || echo 'MEILISEARCH_HOST=http://meilisearch:7700' >> .env
grep -q '^MEILISEARCH_KEY=' .env || echo 'MEILISEARCH_KEY=masterKey' >> .env

grep -q '^FILESYSTEM_DISK=' .env && sed -i 's/^FILESYSTEM_DISK=.*/FILESYSTEM_DISK=s3/' .env || echo 'FILESYSTEM_DISK=s3' >> .env
{
  echo 'AWS_ACCESS_KEY_ID=minioadmin'
  echo 'AWS_SECRET_ACCESS_KEY=minioadmin'
  echo 'AWS_DEFAULT_REGION=ap-south-1'
  echo 'AWS_BUCKET=netasamp-local'
  echo 'AWS_URL=http://minio:9000'
  echo 'AWS_ENDPOINT=http://minio:9000'
  echo 'AWS_USE_PATH_STYLE_ENDPOINT=true'
} >> .env

grep -q '^MAIL_MAILER=' .env && sed -i 's/^MAIL_MAILER=.*/MAIL_MAILER=smtp/' .env || echo 'MAIL_MAILER=smtp' >> .env
grep -q '^MAIL_HOST=' .env && sed -i 's/^MAIL_HOST=.*/MAIL_HOST=mailhog/' .env || echo 'MAIL_HOST=mailhog' >> .env
grep -q '^MAIL_PORT=' .env && sed -i 's/^MAIL_PORT=.*/MAIL_PORT=1025/' .env || echo 'MAIL_PORT=1025' >> .env

echo "[bootstrap] Installing Breeze with Inertia (React)..."
composer require laravel/breeze --dev
php artisan breeze:install react --typescript --dark

echo "[bootstrap] Installing Node dependencies..."
npm ci || npm install
npm run build

echo "[bootstrap] Running migrations..."
php artisan migrate

echo "[bootstrap] Done. Access app at http://localhost:8080"
