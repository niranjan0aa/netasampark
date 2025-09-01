# NetaSampark Setup Guide

This guide will help you set up NetaSampark for development and production environments.

## 🚀 Quick Start (Development)

### Option 1: Automated Setup (Recommended)
```bash
# Clone and setup
git clone <repository-url>
cd netasampark
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Install Dependencies**
   ```bash
   composer install
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   ```bash
   # Using Docker (recommended)
   docker-compose up -d postgres redis meilisearch
   
   # OR install locally:
   # PostgreSQL 15+, Redis 6+, Meilisearch (optional)
   ```

4. **Run Migrations & Seed**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Start Development Servers**
   ```bash
   # All in one
   npm run dev:full
   
   # OR separately:
   php artisan serve    # Terminal 1
   npm run dev         # Terminal 2  
   php artisan horizon # Terminal 3
   ```

## 🏗️ Production Deployment

### AWS Deployment (Recommended)

1. **Infrastructure Setup**
   ```bash
   # Create RDS PostgreSQL instance
   # Create ElastiCache Redis cluster
   # Create S3 bucket for storage
   # Setup ECS/Fargate cluster
   ```

2. **Environment Variables**
   ```env
   APP_ENV=production
   APP_DEBUG=false
   DB_HOST=your-rds-endpoint.amazonaws.com
   REDIS_HOST=your-elasticache-endpoint.amazonaws.com
   AWS_BUCKET=your-s3-bucket-name
   ```

3. **Deploy**
   ```bash
   ./deploy.sh production
   ```

### DigitalOcean Deployment

1. **Create Droplet**
   - Ubuntu 22.04 LTS
   - Minimum 4GB RAM, 2 vCPUs
   - Add managed PostgreSQL and Redis

2. **Setup Server**
   ```bash
   # Install requirements
   sudo apt update
   sudo apt install nginx php8.4-fpm postgresql-client redis-tools
   
   # Clone and setup
   git clone <repository-url>
   cd netasampark
   ./deploy.sh production
   ```

## 🔧 Configuration

### 1. Database Configuration

**Central Database (Required)**
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=netasampark_central
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

**Tenant Database Template**
```env
TENANT_DB_CONNECTION=tenant
TENANT_DB_HOST=127.0.0.1
TENANT_DB_PORT=5432
TENANT_DB_USERNAME=postgres
TENANT_DB_PASSWORD=your_password
```

### 2. External Services

**SMS Configuration (Gupshup)**
```env
SMS_PROVIDER=gupshup
SMS_API_KEY=your_gupshup_api_key
SMS_API_SECRET=your_gupshup_api_secret
SMS_SENDER_ID=your_sender_id
```

**WhatsApp Configuration (Gupshup BSP)**
```env
WHATSAPP_PROVIDER=gupshup
WHATSAPP_API_KEY=your_gupshup_api_key
WHATSAPP_APP_ID=your_whatsapp_app_id
```

**Voice Configuration (Exotel)**
```env
VOICE_PROVIDER=exotel
VOICE_API_KEY=your_exotel_api_key
VOICE_API_SECRET=your_exotel_api_secret
VOICE_ACCOUNT_SID=your_account_sid
```

**Payment Configuration (Razorpay)**
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

**AWS Services**
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=ap-south-1
AWS_BUCKET=your_s3_bucket
```

### 3. Multi-tenancy Configuration

**Domain Setup**
```env
CENTRAL_DOMAINS=netasampark.com,app.netasampark.com
TENANT_DOMAIN_SUFFIX=.netasampark.com
```

## 📋 Testing

### 1. Create Test Tenant
```bash
php artisan tinker

# In Tinker:
$tenant = \App\Models\Tenant::create([
    'id' => \Str::uuid(),
    'name' => 'Test Campaign',
    'plan' => 'professional',
    'status' => 'active',
    'data' => ['email' => 'test@example.com']
]);

$tenant->domains()->create([
    'domain' => 'test.netasampark.com',
    'is_primary' => true
]);
```

### 2. Test Multi-tenancy
```bash
# Add to /etc/hosts for local testing:
127.0.0.1 test.netasampark.com
127.0.0.1 app.netasampark.com

# Visit: http://test.netasampark.com:8000
```

### 3. Test Communication APIs
```bash
# Test SMS
curl -X POST http://test.netasampark.com:8000/api/test-sms \
  -H "Content-Type: application/json" \
  -d '{"phone": "+91XXXXXXXXXX", "message": "Test SMS"}'

# Test WhatsApp
curl -X POST http://test.netasampark.com:8000/api/test-whatsapp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+91XXXXXXXXXX", "message": "Test WhatsApp"}'
```

## 🛠️ Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Run tests
php artisan test

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### 2. Database Changes
```bash
# Create migration
php artisan make:migration create_new_table

# For tenant-specific tables
php artisan make:migration create_new_table --path=database/migrations/tenant

# Run migrations
php artisan migrate
# OR for tenant migrations
php artisan tenants:migrate
```

### 3. Frontend Development
```bash
# Start Vite dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🔍 Monitoring & Debugging

### 1. Laravel Telescope (Development)
```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```
Visit: http://localhost:8000/telescope

### 2. Horizon (Queue Monitoring)
Visit: http://localhost:8000/horizon

### 3. Logs
```bash
# Application logs
tail -f storage/logs/laravel.log

# Queue logs
tail -f storage/logs/horizon.log

# Web server logs (production)
tail -f /var/log/nginx/access.log
```

## 🔐 Security Checklist

### Production Security
- [ ] Change all default passwords
- [ ] Enable HTTPS with valid SSL certificates
- [ ] Configure firewall (only 80, 443, 22 open)
- [ ] Enable database encryption
- [ ] Setup automated backups
- [ ] Configure monitoring and alerts
- [ ] Enable rate limiting
- [ ] Setup WAF (Web Application Firewall)

### Application Security
- [ ] Validate all user inputs
- [ ] Implement CSRF protection
- [ ] Use parameterized queries
- [ ] Sanitize file uploads
- [ ] Implement proper authentication
- [ ] Setup audit logging
- [ ] Regular security updates

## 📊 Performance Optimization

### Database Optimization
```sql
-- Add indexes for common queries
CREATE INDEX idx_voters_phone ON voters(phone);
CREATE INDEX idx_voters_constituency ON voters(constituency_id);
CREATE INDEX idx_messages_campaign ON messages(campaign_id);
CREATE INDEX idx_messages_status ON messages(status);
```

### Redis Configuration
```env
REDIS_CLIENT=predis
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### Application Optimization
```bash
# Production optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Queue optimization
php artisan queue:restart
php artisan horizon:terminate
```

## 🆘 Troubleshooting

### Common Issues

**1. Tenant Database Not Found**
```bash
# Check tenant exists
php artisan tenants:list

# Create tenant database
php artisan tenants:migrate --tenants=<tenant-id>
```

**2. Queue Jobs Failing**
```bash
# Check Horizon status
php artisan horizon:status

# Restart queue workers
php artisan horizon:terminate
```

**3. SMS/WhatsApp Not Sending**
```bash
# Check API credentials
php artisan tinker
config('services.sms.api_key')

# Test API connectivity
curl -X GET https://enterprise.smsgupshup.com/GatewayAPI/rest \
  -H "apikey: your_api_key"
```

**4. Frontend Assets Not Loading**
```bash
# Rebuild assets
npm run build

# Check Vite configuration
npm run dev
```

### Log Locations
- Application: `storage/logs/laravel.log`
- Queue: `storage/logs/horizon.log`
- Web server: `/var/log/nginx/` (production)
- Database: PostgreSQL logs

## 📞 Support

### Development Support
- **Documentation**: Check `/docs` endpoint
- **API Reference**: Available at `/api/documentation`
- **Community**: GitHub Issues

### Production Support
- **Email**: support@netasampark.com
- **Phone**: +91-XXXXX-XXXXX
- **WhatsApp**: +91-XXXXX-XXXXX
- **Emergency**: 24/7 support for Enterprise plans

---

**Happy Campaigning! 🗳️**