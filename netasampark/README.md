# NetaSampark - Political CRM & Campaign Management SaaS

NetaSampark is a comprehensive political CRM and campaign management platform designed specifically for Indian politicians and political parties. It provides end-to-end campaign management, voter engagement, and governance tools with multilingual support and automation.

## 🚀 Features

### 1. Multi-Tenant Platform
- **Multi-tenancy**: Subdomain/custom domain provisioning with SSL
- **Plan Management**: Flexible subscription plans with feature toggles
- **Billing**: Recurring billing (monthly/annual) with prepaid wallet system
- **Partner Management**: Reseller, affiliate, and partner programs
- **White-label**: Custom theming for tenants
- **Compliance**: TRAI DLT templates, WhatsApp BSP templates

### 2. Voter CRM
- **Geo Hierarchy**: State → District → Constituency → Ward → Booth
- **Voter Profiles**: Demographics, householding, influencer tagging
- **Segmentation**: Dynamic & static lists, saved filters
- **Consent Management**: SMS/WhatsApp/Email/Voice opt-in/out
- **Analytics**: Booth-level distribution, demographic breakdowns

### 3. Communication Hub
- **Multi-Channel**: SMS, WhatsApp, Email, Voice campaigns
- **Compliance**: DLT template sync, BSP integration
- **Two-way Communication**: Inbound inbox for WhatsApp/SMS
- **Voice Features**: Dialer, IVR, call disposition logging
- **Personalization**: Dynamic content with voter data

### 4. Ticketing & Knowledge Base
- **Advanced Ticketing**: SLA tracking, queues, categories
- **Multi-channel Intake**: WhatsApp, SMS, Email, IVR
- **Knowledge Base**: Multilingual articles, deflection tracking
- **Automation**: Auto-routing, escalation, KB suggestions

### 5. Calendar & Events
- **Multiple Calendars**: Campaign, Personal, Media
- **Event Management**: Labels, reminders, location, attendees
- **External Sync**: Google/Outlook integration
- **RSVP & Check-in**: QR codes, volunteer task creation

### 6. News Monitoring
- **RSS Integration**: News feeds, government sites, local portals
- **Entity Tagging**: Candidate, rivals, issues, location tracking
- **AI Processing**: Summarization & translation
- **Alerts**: Daily digest, rival mention notifications

### 7. Surveys & Issues
- **Survey Builder**: Multi-language, branching logic
- **Canvassing App**: Offline sync capabilities
- **Issue Tracking**: Grievance management with SLA
- **Citizen Notifications**: Status updates via WhatsApp

### 8. Analytics & Predictions
- **Dashboards**: Campaign funnel, support index, GOTV progress
- **Predictions**: Turnout likelihood, swing booth detection
- **Performance Tracking**: Volunteer productivity, ROI analysis
- **Automated Reports**: Daily/weekly briefings

### 9. Finance & Compliance
- **Expense Management**: Election Commission categories, soft limits
- **Donor Management**: Receipt generation, segmentation
- **Compliance**: EC-ready exports, GST integration
- **Automated Alerts**: Spending limit notifications

### 10. Partner System
- **Affiliates**: Referral tracking, commission management
- **Resellers**: Tenant provisioning, white-label options
- **Commission Tiers**: Automated payouts, clawback handling

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11 (PHP 8.4)
- **Multi-tenancy**: stancl/tenancy
- **Database**: PostgreSQL with JSONB support
- **Search**: Meilisearch
- **Cache**: Redis
- **Queue**: Laravel Horizon
- **Storage**: S3-compatible (AWS/DigitalOcean Spaces)

### Frontend
- **Framework**: Inertia.js with React
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Icons**: Heroicons
- **State Management**: React hooks + Inertia shared data

### External Integrations
- **SMS**: Gupshup, RouteMobile, MSG91
- **WhatsApp**: Gupshup BSP, Meta Cloud API
- **Email**: Amazon SES
- **Voice**: Exotel, Twilio
- **Payments**: Razorpay, Stripe
- **Translation**: AWS Translate

### Infrastructure
- **Hosting**: AWS (ECS/Fargate + RDS + S3 + CloudFront) or DigitalOcean
- **CDN**: CloudFront
- **Monitoring**: Laravel Telescope, Horizon
- **Backup**: Automated S3 backups

## 📁 Project Structure

```
netasampark/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Central/          # Central/Admin controllers
│   │   │   ├── Auth/             # Authentication controllers
│   │   │   └── *.php             # Tenant controllers
│   │   └── Middleware/
│   ├── Models/
│   │   ├── Tenant.php            # Central tenant model
│   │   ├── Domain.php            # Central domain model
│   │   └── *.php                 # Tenant models
│   ├── Services/                 # Business logic services
│   └── Providers/
├── database/
│   ├── migrations/               # Central database migrations
│   └── migrations/tenant/        # Tenant database migrations
├── resources/
│   ├── js/
│   │   ├── Pages/               # Inertia.js React pages
│   │   ├── Components/          # Reusable React components
│   │   ├── Layouts/             # Layout components
│   │   └── app.jsx              # Main React application
│   ├── css/
│   └── views/
├── routes/
│   ├── central.php              # Central/Admin routes
│   ├── tenant.php               # Tenant routes
│   └── web.php                  # Default routes
└── config/
    ├── tenancy.php              # Tenancy configuration
    └── *.php                    # Other configurations
```

## 🚀 Getting Started

### Prerequisites
- PHP 8.4+
- Composer
- Node.js 18+
- PostgreSQL 13+
- Redis 6+
- Meilisearch (optional, for search)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netasampark
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure environment variables**
   Update `.env` with your database, Redis, and external service credentials.

6. **Database setup**
   ```bash
   # Create central database
   createdb netasampark_central
   
   # Run central migrations
   php artisan migrate
   
   # Seed initial data
   php artisan db:seed
   ```

7. **Build frontend assets**
   ```bash
   npm run build
   # or for development
   npm run dev
   ```

8. **Start the application**
   ```bash
   php artisan serve
   ```

### Development Setup

1. **Start development servers**
   ```bash
   # Terminal 1: Laravel server
   php artisan serve
   
   # Terminal 2: Vite dev server
   npm run dev
   
   # Terminal 3: Queue worker
   php artisan horizon
   ```

2. **Create a test tenant**
   ```bash
   php artisan tinker
   
   # In tinker:
   $tenant = \App\Models\Tenant::create([
       'id' => \Str::uuid(),
       'name' => 'Test Campaign',
       'plan' => 'professional',
       'status' => 'active'
   ]);
   
   $tenant->domains()->create([
       'domain' => 'test.netasampark.com',
       'is_primary' => true
   ]);
   ```

## 🔧 Configuration

### Multi-tenancy Setup
The application uses database-per-tenant architecture with the following setup:

- **Central Database**: Manages tenants, domains, billing, partners
- **Tenant Databases**: Individual databases for each tenant's data
- **Domain Routing**: Automatic tenant resolution via subdomain

### External Service Configuration

#### SMS/WhatsApp (Gupshup)
```env
SMS_PROVIDER=gupshup
SMS_API_KEY=your_api_key
WHATSAPP_PROVIDER=gupshup
WHATSAPP_API_KEY=your_api_key
```

#### Payments (Razorpay)
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

#### AWS Services
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=ap-south-1
AWS_BUCKET=your_s3_bucket
```

## 📊 Database Schema

### Central Database Tables
- `tenants` - Tenant information and metadata
- `domains` - Tenant domains and SSL status
- `plans` - Subscription plans and features
- `subscriptions` - Tenant subscriptions
- `invoices` - Billing and invoices
- `partners` - Affiliate/reseller data
- `wallets` - Prepaid wallet balances

### Tenant Database Tables
- `users` - Tenant users and staff
- `states/districts/constituencies/wards/booths` - Geo hierarchy
- `voters` - Comprehensive voter profiles
- `campaigns` - Campaign management
- `messages` - Communication logs
- `tickets` - Issue tracking
- `events` - Calendar and events
- `surveys` - Survey data
- `news_articles` - News monitoring
- `expenses/donors` - Finance tracking

## 🔐 Security & Compliance

### Data Protection
- **Tenant Isolation**: Complete database separation
- **Encryption**: All sensitive data encrypted at rest
- **Access Control**: Role-based permissions
- **Audit Logs**: Complete activity tracking

### Indian Compliance
- **TRAI DLT**: SMS template registration and compliance
- **WhatsApp BSP**: Business solution provider integration
- **Election Commission**: Expense tracking and reporting
- **GST**: Automated tax calculation and invoicing
- **Data Localization**: All data stored in Indian data centers

## 🚀 Deployment

### Production Deployment (AWS)
1. **Infrastructure Setup**
   - ECS/Fargate for application hosting
   - RDS PostgreSQL for databases
   - ElastiCache Redis for caching
   - S3 for file storage
   - CloudFront for CDN

2. **Environment Configuration**
   ```bash
   # Production environment
   APP_ENV=production
   APP_DEBUG=false
   
   # Database
   DB_CONNECTION=pgsql
   DB_HOST=your-rds-endpoint
   
   # Redis
   REDIS_HOST=your-elasticache-endpoint
   ```

3. **Deployment Commands**
   ```bash
   # Build assets
   npm run build
   
   # Optimize Laravel
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   
   # Run migrations
   php artisan migrate --force
   ```

## 📈 Monitoring & Analytics

### Application Monitoring
- **Laravel Telescope**: Request/query debugging
- **Horizon**: Queue monitoring and metrics
- **Custom Dashboards**: Tenant health scores, usage analytics

### Business Analytics
- **Tenant Metrics**: Usage vs quotas, growth trends
- **Campaign Performance**: Delivery rates, engagement metrics
- **Revenue Tracking**: MRR, churn, partner performance

## 🤝 Contributing

### Development Guidelines
1. Follow PSR-12 coding standards
2. Write comprehensive tests
3. Document all API endpoints
4. Use conventional commits
5. Ensure multi-tenant compatibility

### Testing
```bash
# Run tests
php artisan test

# Run with coverage
php artisan test --coverage
```

## 📞 Support

### Documentation
- **API Documentation**: Available at `/docs`
- **User Guide**: Multi-language user documentation
- **Developer Guide**: Integration and customization docs

### Support Channels
- **Email**: support@netasampark.com
- **WhatsApp**: +91-XXXXX-XXXXX
- **Documentation**: docs.netasampark.com

## 📄 License

This project is proprietary software. All rights reserved.

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Multi-tenant foundation
- ✅ Voter CRM
- ✅ Basic communication hub
- 🔄 Ticketing system
- 🔄 Calendar & events

### Phase 2 (Next)
- 📋 Advanced analytics
- 📋 News monitoring
- 📋 Survey system
- 📋 Finance module
- 📋 Mobile app

### Phase 3 (Future)
- 📋 AI-powered insights
- 📋 Advanced automation
- 📋 Integration marketplace
- 📋 Voice AI assistant
- 📋 Blockchain voting

---

**Built with ❤️ for Indian democracy**