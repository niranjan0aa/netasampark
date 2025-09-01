#!/bin/bash

# NetaSampark Deployment Script
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh production

set -e

ENVIRONMENT=${1:-staging}

echo "🚀 Starting NetaSampark deployment for $ENVIRONMENT environment..."

# Check if required commands exist
command -v php >/dev/null 2>&1 || { echo "❌ PHP is required but not installed. Aborting." >&2; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "❌ Composer is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ NPM is required but not installed. Aborting." >&2; exit 1; }

# Backup current deployment (if exists)
if [ -f "artisan" ]; then
    echo "📦 Creating backup..."
    php artisan down --message="Deployment in progress" --retry=60
    
    if [ -d "backup" ]; then
        rm -rf backup
    fi
    mkdir backup
    cp -r storage/app backup/
    cp .env backup/
fi

# Install dependencies
echo "📥 Installing dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Install and build frontend assets
echo "🎨 Building frontend assets..."
npm ci --only=production
npm run build

# Clear caches
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Run database migrations
echo "🗃️  Running database migrations..."
php artisan migrate --force

# Seed initial data (only if needed)
if [ "$ENVIRONMENT" != "production" ]; then
    echo "🌱 Seeding database..."
    php artisan db:seed --force
fi

# Optimize for production
if [ "$ENVIRONMENT" = "production" ]; then
    echo "⚡ Optimizing for production..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan event:cache
fi

# Set proper permissions
echo "🔒 Setting permissions..."
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Start queue workers
echo "🔄 Starting queue workers..."
php artisan horizon:terminate
php artisan horizon &

# Bring application back up
if [ -f "artisan" ]; then
    php artisan up
fi

# Health check
echo "🏥 Running health check..."
if curl -f -s http://localhost/up > /dev/null; then
    echo "✅ Deployment successful! Application is healthy."
else
    echo "❌ Health check failed! Please check application logs."
    exit 1
fi

echo "🎉 NetaSampark deployment completed successfully!"

# Show deployment summary
echo ""
echo "📊 Deployment Summary:"
echo "Environment: $ENVIRONMENT"
echo "PHP Version: $(php --version | head -n 1)"
echo "Laravel Version: $(php artisan --version)"
echo "Timestamp: $(date)"
echo ""

if [ "$ENVIRONMENT" = "production" ]; then
    echo "🔍 Post-deployment checklist:"
    echo "□ Verify SSL certificates"
    echo "□ Test payment gateways"
    echo "□ Check SMS/WhatsApp APIs"
    echo "□ Monitor error logs"
    echo "□ Verify backup systems"
fi