# NetaSampark - Political CRM + Campaign Management SaaS

A comprehensive, production-ready SaaS platform designed specifically for Indian politicians and political parties to manage end-to-end campaign operations, voter engagement, and governance activities.

## 🎯 Overview

NetaSampark is a full-fledged Political CRM that provides Indian politicians and parties with comprehensive tools for campaign management, voter engagement, and governance operations. Built with modern technologies and designed for scale, it supports multi-tenancy, multilingual operations, and integrates with major Indian communication platforms.

## ✨ Key Features

### 🏢 Platform & Super Admin
- **Multi-tenancy**: Subdomain/custom domain provisioning with SSL and tenant DB isolation
- **Plan Management**: Flexible subscription plans with module toggles
- **Billing System**: Recurring payments, prepaid wallet for SMS/WhatsApp/calls
- **Partner Management**: Reseller and affiliate program support
- **White-label**: Customizable tenant theming
- **Compliance**: TRAI DLT templates, WhatsApp BSP templates

### 👥 Constituency & Voter CRM
- **Geo Hierarchy**: State → District → Constituency → Ward → Booth
- **Voter Profiles**: Demographics, householding, influencer tagging
- **Segmentation**: Dynamic lists, saved filters, advanced search
- **Consent Management**: SMS/WhatsApp/Email/Voice opt-in/out

### 📱 Communication Hub
- **Multi-channel**: SMS, WhatsApp, Email, Voice campaigns
- **Bulk Campaigns**: Personalization, drip campaigns, scheduling
- **Template Management**: Pre-approved templates for compliance
- **Inbound Handling**: Two-way communication, auto-responses
- **Analytics**: Delivery rates, engagement metrics, ROI tracking

### 🎫 Ticketing & Knowledge Base
- **Advanced Ticketing**: SLA management, queues, categories
- **Multi-channel Intake**: WhatsApp, SMS, Email, IVR
- **Knowledge Base**: Multilingual articles, deflection tracking
- **Automation**: Auto-routing, escalation, macros

### 📅 Calendar & Events
- **Campaign Calendar**: Rally scheduling, volunteer management
- **Event Management**: RSVP, QR check-in, task automation
- **Integration**: Google/Outlook calendar sync
- **Analytics**: Attendance tracking, cost analysis

### 📰 Local News & Events
- **RSS Integration**: News feeds, government sites, local portals
- **Entity Tagging**: Candidate mentions, rival tracking, issue monitoring
- **Summarization**: AI-powered news summaries in multiple languages
- **Alerts**: High-impact mention notifications

### 📊 Surveys & Issues
- **Survey Builder**: Multi-language, branching logic
- **Canvassing App**: Offline sync, mobile optimization
- **Issue Tracker**: Grievance management, SLA tracking
- **Citizen Engagement**: Status notifications, progress updates

### 📈 Analytics & Predictions
- **Campaign Analytics**: Funnel analysis, support index, GOTV progress
- **Predictive Models**: Turnout likelihood, swing booth detection
- **Volunteer Productivity**: Leaderboards, performance metrics
- **Real-time Dashboards**: War room briefs, live updates

### 💰 Finance & Compliance
- **Expense Management**: EC category compliance, soft limits
- **Donor Management**: Receipts, segmentation, tracking
- **Compliance Reports**: Election Commission ready exports
- **GST Integration**: Automated invoice generation

### 🤝 Partner/Reseller/Affiliate
- **Affiliate Program**: Referral tracking, commission management
- **Reseller Portal**: Tenant provisioning, white-label options
- **Commission Tiers**: Multi-level, clawback protection
- **KYC/GST Support**: Partner verification and compliance

## 🚀 Tech Stack

### Backend
- **Framework**: Laravel 11 (PHP 8.3)
- **Multi-tenancy**: stancl/tenancy
- **Queue System**: Laravel Horizon + Redis
- **Database**: PostgreSQL with JSONB support
- **Search**: Meilisearch
- **Cache**: Redis
- **Storage**: S3-compatible storage

### Frontend
- **Framework**: React 18 with TypeScript
- **SSR**: Inertia.js
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Charts**: Recharts
- **Forms**: React Hook Form

### Mobile/PWA
- **PWA**: React PWA with service workers
- **Mobile**: Capacitor for native app deployment
- **Offline Support**: IndexedDB, service worker caching

### Communication APIs
- **SMS**: Gupshup, RouteMobile, MSG91
- **WhatsApp**: Gupshup BSP, Meta Cloud API
- **Email**: AWS SES
- **Voice**: Exotel, Twilio

### Payments
- **Primary**: Razorpay
- **Alternative**: Stripe
- **GST**: Automated compliance

### Infrastructure
- **Cloud**: AWS (ECS/Fargate + RDS + S3 + CloudFront)
- **Alternative**: DigitalOcean (lean start)
- **CDN**: CloudFront
- **Monitoring**: CloudWatch, Sentry

### Multilingual Support
- **Framework**: Laravel Localization
- **Translation**: AWS Translate
- **Languages**: All major Indian languages (Hindi, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Urdu)

## 📋 Requirements

### System Requirements
- **PHP**: 8.3 or higher
- **Node.js**: 18 or higher
- **Database**: PostgreSQL 13 or higher
- **Redis**: 6.0 or higher
- **Web Server**: Nginx/Apache
- **SSL**: Required for production

### PHP Extensions
- BCMath
- Ctype
- cURL
- DOM
- Fileinfo
- JSON
- Mbstring
- OpenSSL
- PCRE
- PDO
- Tokenizer
- XML
- GD (for image processing)
- Redis (for caching)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/netasampark.git
cd netasampark
```

### 2. Install Dependencies
```bash
# Backend dependencies
composer install

# Frontend dependencies
npm install
```

### 3. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your environment variables
# Edit .env file with your database, API keys, etc.
```

### 4. Database Setup
```bash
# Run migrations
php artisan migrate

# Seed initial data
php artisan db:seed

# Create super admin
php artisan make:admin
```

### 5. Build Frontend
```bash
# Development
npm run dev

# Production
npm run build
```

### 6. Queue Workers
```bash
# Start queue workers
php artisan queue:work

# Or use Horizon (recommended)
php artisan horizon
```

### 7. Serve Application
```bash
# Development server
php artisan serve

# Or configure your web server (Nginx/Apache)
```

## 🔧 Configuration

### Multi-tenancy Setup
```php
// config/tenancy.php
'central_domains' => [
    'netasampark.com',
    'localhost',
],

'tenant_model' => \App\Models\Tenant::class,
```

### Communication Gateways
```php
// config/services.php
'sms' => [
    'default' => env('SMS_DRIVER', 'gupshup'),
    'gupshup' => [
        'api_key' => env('GUPSHUP_API_KEY'),
        'sender_id' => env('GUPSHUP_SENDER_ID'),
    ],
],
```

### Payment Configuration
```php
// config/payment.php
'default' => env('PAYMENT_DRIVER', 'razorpay'),
'razorpay' => [
    'key' => env('RAZORPAY_KEY'),
    'secret' => env('RAZORPAY_SECRET'),
],
```

## 📱 API Documentation

### Authentication
```bash
# Login
POST /api/auth/login
{
    "email": "user@example.com",
    "password": "password"
}

# Get user profile
GET /api/user
Authorization: Bearer {token}
```

### Voter Management
```bash
# Get voters
GET /api/voters?constituency=mumbai&ward=5&page=1

# Create voter
POST /api/voters
{
    "name": "Rajesh Kumar",
    "phone": "+919876543210",
    "constituency": "Mumbai Central",
    "ward": "Ward 5"
}
```

### Campaign Management
```bash
# Create campaign
POST /api/communication/campaigns
{
    "name": "Festival Greetings",
    "type": "whatsapp",
    "template": "festival_greeting_01",
    "recipients": [1, 2, 3],
    "scheduled_at": "2024-01-20 08:00:00"
}
```

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Frontend assets built
- [ ] Queue workers configured
- [ ] SSL certificates installed
- [ ] Monitoring setup
- [ ] Backup strategy configured
- [ ] Performance testing completed

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or use individual containers
docker run -d --name netasampark-app \
    -p 8000:8000 \
    -v $(pwd):/var/www/html \
    netasampark/app
```

### AWS Deployment
```bash
# Deploy to ECS
aws ecs create-service \
    --cluster netasampark \
    --service-name app \
    --task-definition netasampark:1

# Or use AWS CLI for RDS, S3, etc.
```

## 📊 Performance & Scaling

### Optimization Tips
- Enable Redis caching for sessions and queries
- Use database connection pooling
- Implement CDN for static assets
- Configure queue workers for background jobs
- Use database indexing for large datasets
- Implement API rate limiting

### Monitoring
- Laravel Horizon for queue monitoring
- CloudWatch for AWS metrics
- Sentry for error tracking
- Custom dashboards for business metrics

## 🔒 Security Features

- CSRF protection
- SQL injection prevention
- XSS protection
- Rate limiting
- Input validation
- Secure file uploads
- API authentication
- Role-based access control
- Audit logging

## 📈 Business Intelligence

### Key Metrics
- Voter engagement rates
- Campaign performance
- Cost per contact
- Support level trends
- Geographic distribution
- Communication channel effectiveness

### Reports
- Daily war room briefs
- Weekly performance summaries
- Monthly compliance reports
- Quarterly business reviews

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Fork the repository
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m 'Add amazing feature'

# Push to branch
git push origin feature/amazing-feature

# Create Pull Request
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [User Guide](docs/user-guide.md)
- [API Reference](docs/api.md)
- [Deployment Guide](docs/deployment.md)
- [Troubleshooting](docs/troubleshooting.md)

### Community
- [Discussions](https://github.com/your-org/netasampark/discussions)
- [Issues](https://github.com/your-org/netasampark/issues)
- [Discord](https://discord.gg/netasampark)

### Commercial Support
For enterprise support and custom development, contact us at:
- Email: support@netasampark.com
- Phone: +91-XXXXXXXXXX
- Website: https://netasampark.com

## 🙏 Acknowledgments

- Laravel team for the amazing framework
- React team for the frontend library
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters

---

**Built with ❤️ for Indian Democracy**

*NetaSampark - Empowering Political Campaigns Through Technology*