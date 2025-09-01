#!/bin/bash

# NetaSampark Development Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up NetaSampark development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    php artisan key:generate
fi

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Check if Docker is available
if command -v docker-compose >/dev/null 2>&1; then
    echo "🐳 Starting Docker services..."
    docker-compose up -d postgres redis meilisearch mailhog
    
    # Wait for PostgreSQL to be ready
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 10
    
    # Check if database exists
    if ! docker-compose exec -T postgres psql -U postgres -lqt | cut -d \| -f 1 | grep -qw netasampark_central; then
        echo "🗃️  Creating central database..."
        docker-compose exec -T postgres createdb -U postgres netasampark_central
    fi
else
    echo "⚠️  Docker not available. Please ensure PostgreSQL and Redis are running locally."
    echo "   PostgreSQL: localhost:5432 (database: netasampark_central)"
    echo "   Redis: localhost:6379"
fi

# Run migrations
echo "🗃️  Running central database migrations..."
php artisan migrate --force

# Seed initial data
echo "🌱 Seeding initial data..."
php artisan db:seed --force

# Create storage link
echo "🔗 Creating storage link..."
php artisan storage:link

# Install Horizon assets
echo "📊 Installing Horizon assets..."
php artisan horizon:install

# Publish vendor assets
echo "📄 Publishing vendor assets..."
php artisan vendor:publish --tag=laravel-assets --force

# Clear and cache configurations
echo "⚡ Optimizing application..."
php artisan config:cache
php artisan route:cache

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev:full    # Starts Laravel, Vite, and Horizon"
echo "   OR run separately:"
echo "   php artisan serve   # Laravel server"
echo "   npm run dev         # Vite dev server"
echo "   php artisan horizon # Queue worker"
echo ""
echo "🌐 Application URLs:"
echo "   Main app: http://localhost:8000"
echo "   Horizon: http://localhost:8000/horizon"
if command -v docker-compose >/dev/null 2>&1; then
    echo "   Mailhog: http://localhost:8025"
    echo "   Meilisearch: http://localhost:7700"
fi
echo ""
echo "📋 Next steps:"
echo "1. Configure external API keys in .env"
echo "2. Create a test tenant: php artisan tinker"
echo "3. Import sample voter data"
echo "4. Test SMS/WhatsApp integration"
echo ""