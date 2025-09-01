#!/bin/bash

echo "🚀 NetaSampark - Political CRM SaaS Quick Start"
echo "================================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install it and try again."
    exit 1
fi

echo "✅ Docker environment check passed"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p docker/nginx/conf.d
mkdir -p docker/php
mkdir -p docker/postgres/init

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before continuing"
    echo "   Press Enter when ready to continue..."
    read
fi

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
if command -v composer &> /dev/null; then
    composer install --no-interaction
else
    echo "⚠️  Composer not found. Please install it manually or use Docker."
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
if command -v npm &> /dev/null; then
    npm install
else
    echo "⚠️  npm not found. Please install it manually or use Docker."
fi

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Generate application key
echo "🔑 Generating application key..."
docker-compose exec app php artisan key:generate

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose exec app php artisan migrate --force

# Seed database
echo "🌱 Seeding database..."
docker-compose exec app php artisan db:seed --force

# Build frontend assets
echo "🎨 Building frontend assets..."
docker-compose exec app npm run build

# Set proper permissions
echo "🔐 Setting proper permissions..."
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache

echo ""
echo "🎉 NetaSampark is ready!"
echo "========================"
echo ""
echo "🌐 Application: http://localhost:8000"
echo "📧 Mailpit: http://localhost:8025"
echo "🔍 Meilisearch: http://localhost:7700"
echo "🗄️  Database: localhost:5432"
echo "📱 Redis: localhost:6379"
echo ""
echo "📚 Next steps:"
echo "1. Visit http://localhost:8000 to access the application"
echo "2. Check the logs: docker-compose logs -f"
echo "3. Stop services: docker-compose down"
echo "4. View README.md for detailed documentation"
echo ""
echo "🔧 Development commands:"
echo "- View logs: docker-compose logs -f [service]"
echo "- Restart service: docker-compose restart [service]"
echo "- Access container: docker-compose exec [service] bash"
echo "- Run artisan: docker-compose exec app php artisan [command]"
echo ""
echo "Happy coding! 🚀"