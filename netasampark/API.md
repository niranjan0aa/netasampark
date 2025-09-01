# NetaSampark API Documentation

## Overview

NetaSampark provides a comprehensive REST API for political campaign management, voter CRM, and communication automation. The API is built on Laravel and follows RESTful conventions with JSON responses.

## Base URLs

- **Central API**: `https://app.netasampark.com/api`
- **Tenant API**: `https://{tenant}.netasampark.com/api`

## Authentication

### API Keys
```http
Authorization: Bearer {api_key}
```

### Tenant Context
For tenant-specific operations, use the tenant's subdomain:
```http
GET https://mycampaign.netasampark.com/api/voters
```

## Rate Limiting

- **Standard**: 1000 requests/hour per API key
- **Premium**: 5000 requests/hour per API key
- **Enterprise**: 10000 requests/hour per API key

## Response Format

### Success Response
```json
{
    "success": true,
    "data": {},
    "message": "Operation completed successfully",
    "meta": {
        "pagination": {},
        "timestamp": "2025-01-24T10:30:00Z"
    }
}
```

### Error Response
```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "The given data was invalid.",
        "details": {
            "email": ["The email field is required."]
        }
    },
    "meta": {
        "timestamp": "2025-01-24T10:30:00Z"
    }
}
```

## Central API Endpoints

### Tenant Management

#### Create Tenant
```http
POST /api/tenants
Content-Type: application/json

{
    "name": "Campaign Name",
    "email": "contact@campaign.com",
    "subdomain": "mycampaign",
    "plan": "professional",
    "admin_name": "Admin Name",
    "admin_email": "admin@campaign.com",
    "admin_password": "secure_password"
}
```

#### List Tenants
```http
GET /api/tenants?page=1&per_page=25&status=active
```

#### Get Tenant Details
```http
GET /api/tenants/{tenant_id}
```

#### Update Tenant Status
```http
PUT /api/tenants/{tenant_id}/status
Content-Type: application/json

{
    "status": "suspended"
}
```

### Billing & Subscriptions

#### Get Tenant Usage
```http
GET /api/tenants/{tenant_id}/usage
```

#### Create Invoice
```http
POST /api/invoices
Content-Type: application/json

{
    "tenant_id": "uuid",
    "amount": 9999.00,
    "line_items": [
        {
            "description": "Professional Plan - January 2025",
            "amount": 9999.00,
            "quantity": 1
        }
    ]
}
```

## Tenant API Endpoints

### Voter Management

#### List Voters
```http
GET /api/voters?page=1&per_page=25&search=name&constituency_id=1
```

#### Create Voter
```http
POST /api/voters
Content-Type: application/json

{
    "voter_id": "ABC1234567",
    "name": "Voter Name",
    "father_name": "Father Name",
    "gender": "male",
    "phone": "+91XXXXXXXXXX",
    "email": "voter@example.com",
    "address": "Complete Address",
    "booth_id": 1,
    "ward_id": 1,
    "constituency_id": 1,
    "sms_consent": true,
    "whatsapp_consent": true
}
```

#### Get Voter Details
```http
GET /api/voters/{voter_id}
```

#### Update Voter
```http
PUT /api/voters/{voter_id}
Content-Type: application/json

{
    "support_level": "strong_support",
    "is_influencer": true,
    "tags": ["booth_agent", "social_media_active"]
}
```

#### Import Voters
```http
POST /api/voters/import
Content-Type: multipart/form-data

file: voters.csv
mapping: {
    "name": "Name",
    "voter_id": "Voter ID",
    "phone": "Mobile"
}
```

### Campaign Management

#### Create Campaign
```http
POST /api/campaigns
Content-Type: application/json

{
    "name": "Festival Wishes 2025",
    "type": "whatsapp",
    "message_content": "Dear {{name}}, Happy New Year! 🎉",
    "target_segments": [
        {
            "type": "constituency",
            "values": [1, 2, 3]
        },
        {
            "type": "support_level", 
            "values": ["strong_support", "lean_support"]
        }
    ],
    "scheduled_at": "2025-01-26T10:00:00Z"
}
```

#### Launch Campaign
```http
POST /api/campaigns/{campaign_id}/launch
```

#### Get Campaign Status
```http
GET /api/campaigns/{campaign_id}/status
```

### Communication

#### Send Individual Message
```http
POST /api/messages/send
Content-Type: application/json

{
    "voter_id": 123,
    "channel": "whatsapp",
    "content": "Your custom message here",
    "template_id": "template_001"
}
```

#### Get Inbox Messages
```http
GET /api/messages/inbox?channel=whatsapp&status=unread
```

#### Send Bulk Messages
```http
POST /api/messages/bulk
Content-Type: application/json

{
    "voter_ids": [1, 2, 3, 4, 5],
    "channel": "sms",
    "content": "Bulk message content",
    "template_id": "bulk_template_001"
}
```

### Ticketing

#### Create Ticket
```http
POST /api/tickets
Content-Type: application/json

{
    "subject": "Road Repair Request",
    "description": "Main road in Ward 12 needs urgent repair",
    "priority": "high",
    "category_id": 1,
    "voter_id": 123,
    "source_channel": "whatsapp",
    "customer_phone": "+91XXXXXXXXXX"
}
```

#### List Tickets
```http
GET /api/tickets?status=open&priority=high&assigned_to=5
```

#### Add Ticket Reply
```http
POST /api/tickets/{ticket_id}/replies
Content-Type: application/json

{
    "content": "We have forwarded your request to the municipal corporation.",
    "is_internal": false
}
```

### Analytics

#### Get Dashboard Stats
```http
GET /api/analytics/dashboard
```

#### Get Campaign Analytics
```http
GET /api/analytics/campaigns/{campaign_id}
```

#### Get Voter Engagement
```http
GET /api/analytics/engagement?period=30days&constituency_id=1
```

#### Get Predictions
```http
GET /api/analytics/predictions/turnout?constituency_id=1
```

### Events & Calendar

#### Create Event
```http
POST /api/events
Content-Type: application/json

{
    "title": "Public Rally",
    "description": "Rally for development issues",
    "start_time": "2025-01-26T18:00:00Z",
    "end_time": "2025-01-26T20:00:00Z",
    "location": "Community Center, Ward 15",
    "type": "rally",
    "expected_attendees": 500
}
```

#### Get Calendar Events
```http
GET /api/events?start_date=2025-01-01&end_date=2025-01-31
```

### Surveys & Issues

#### Create Survey
```http
POST /api/surveys
Content-Type: application/json

{
    "title": "Development Priorities Survey",
    "questions": [
        {
            "type": "multiple_choice",
            "question": "What is your top priority?",
            "options": ["Roads", "Water", "Electricity", "Healthcare"]
        }
    ],
    "target_segments": [
        {"type": "constituency", "values": [1]}
    ]
}
```

#### Submit Survey Response
```http
POST /api/surveys/{survey_id}/responses
Content-Type: application/json

{
    "voter_id": 123,
    "responses": [
        {
            "question_id": 1,
            "answer": "Roads"
        }
    ]
}
```

## Webhooks

### SMS Delivery Status
```http
POST /webhooks/sms
Content-Type: application/json

{
    "message_id": "external_msg_id",
    "status": "delivered",
    "timestamp": "2025-01-24T10:30:00Z",
    "error_code": null
}
```

### WhatsApp Status
```http
POST /webhooks/whatsapp
Content-Type: application/json

{
    "message_id": "external_msg_id", 
    "status": "read",
    "timestamp": "2025-01-24T10:30:00Z"
}
```

### Payment Webhook (Razorpay)
```http
POST /webhooks/razorpay
Content-Type: application/json

{
    "event": "payment.captured",
    "payload": {
        "payment": {
            "entity": {
                "id": "pay_XXXXXXXXXX",
                "amount": 999900,
                "status": "captured"
            }
        }
    }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `UNAUTHORIZED` | Invalid or missing authentication |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `QUOTA_EXCEEDED` | Usage quota exceeded |
| `TENANT_SUSPENDED` | Tenant account suspended |
| `CONSENT_REQUIRED` | Voter consent required for communication |
| `TEMPLATE_NOT_APPROVED` | DLT/BSP template not approved |
| `INSUFFICIENT_BALANCE` | Wallet balance insufficient |
| `RATE_LIMITED` | Too many requests |

## SDKs & Libraries

### PHP SDK
```bash
composer require netasampark/php-sdk
```

```php
use NetaSampark\Client;

$client = new Client('your_api_key', 'https://mycampaign.netasampark.com');

// Send SMS
$result = $client->sms()->send('+91XXXXXXXXXX', 'Hello {{name}}!', [
    'name' => 'Voter Name'
]);

// Get voters
$voters = $client->voters()->list(['constituency_id' => 1]);
```

### JavaScript SDK
```bash
npm install @netasampark/js-sdk
```

```javascript
import NetaSampark from '@netasampark/js-sdk';

const client = new NetaSampark({
    apiKey: 'your_api_key',
    baseUrl: 'https://mycampaign.netasampark.com'
});

// Send WhatsApp
await client.whatsapp.send('+91XXXXXXXXXX', 'Hello {{name}}!', {
    name: 'Voter Name'
});

// Get campaign stats
const stats = await client.campaigns.getStats('campaign_id');
```

## Compliance & Best Practices

### TRAI DLT Compliance (SMS)
- All SMS templates must be registered with DLT
- Include template ID in API calls
- Maintain consent records
- Regular compliance reporting

### WhatsApp BSP Guidelines
- Use approved message templates only
- Respect 24-hour messaging window
- Handle opt-outs immediately
- Monitor quality ratings

### Data Protection
- Encrypt sensitive voter data
- Implement data retention policies
- Provide data export/deletion
- Audit all data access

### Election Commission Compliance
- Track all campaign expenses
- Maintain donor records
- Generate compliance reports
- Respect campaign spending limits

---

For more detailed documentation, visit: https://docs.netasampark.com