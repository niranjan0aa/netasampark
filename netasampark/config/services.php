<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // SMS Services
    'sms' => [
        'provider' => env('SMS_PROVIDER', 'gupshup'),
        'gupshup' => [
            'api_key' => env('SMS_API_KEY'),
            'api_secret' => env('SMS_API_SECRET'),
            'user_id' => env('SMS_USER_ID'),
            'password' => env('SMS_PASSWORD'),
            'sender_id' => env('SMS_SENDER_ID'),
            'base_url' => 'https://enterprise.smsgupshup.com/GatewayAPI/rest',
        ],
        'msg91' => [
            'api_key' => env('SMS_API_KEY'),
            'sender_id' => env('SMS_SENDER_ID'),
            'base_url' => 'https://api.msg91.com/api',
        ],
        'routemobile' => [
            'api_key' => env('SMS_API_KEY'),
            'sender_id' => env('SMS_SENDER_ID'),
            'base_url' => 'https://rmlconnect.net/bulksms/bulksms',
        ],
    ],

    // WhatsApp Services
    'whatsapp' => [
        'provider' => env('WHATSAPP_PROVIDER', 'gupshup'),
        'gupshup' => [
            'api_key' => env('WHATSAPP_API_KEY'),
            'app_id' => env('WHATSAPP_APP_ID'),
            'base_url' => 'https://api.gupshup.io/sm/api/v1',
        ],
        'meta' => [
            'access_token' => env('WHATSAPP_ACCESS_TOKEN'),
            'phone_number_id' => env('WHATSAPP_PHONE_NUMBER_ID'),
            'base_url' => 'https://graph.facebook.com/v18.0',
        ],
    ],

    // Voice Services
    'voice' => [
        'provider' => env('VOICE_PROVIDER', 'exotel'),
        'exotel' => [
            'api_key' => env('VOICE_API_KEY'),
            'api_secret' => env('VOICE_API_SECRET'),
            'account_sid' => env('VOICE_ACCOUNT_SID'),
            'caller_id' => env('VOICE_CALLER_ID'),
            'base_url' => 'https://api.exotel.com/v1',
        ],
        'twilio' => [
            'account_sid' => env('TWILIO_ACCOUNT_SID'),
            'auth_token' => env('TWILIO_AUTH_TOKEN'),
            'caller_id' => env('TWILIO_CALLER_ID'),
            'base_url' => 'https://api.twilio.com/2010-04-01',
        ],
    ],

    // Payment Services
    'razorpay' => [
        'key_id' => env('RAZORPAY_KEY_ID'),
        'key_secret' => env('RAZORPAY_KEY_SECRET'),
        'webhook_secret' => env('RAZORPAY_WEBHOOK_SECRET'),
        'base_url' => 'https://api.razorpay.com/v1',
    ],

    'stripe' => [
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],

    // Translation Services
    'translation' => [
        'provider' => 'aws',
        'aws' => [
            'access_key' => env('AWS_TRANSLATE_ACCESS_KEY'),
            'secret_key' => env('AWS_TRANSLATE_SECRET_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'ap-south-1'),
        ],
    ],

    // Search Services
    'meilisearch' => [
        'host' => env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),
        'key' => env('MEILISEARCH_KEY'),
    ],

    // Push Notifications
    'pusher' => [
        'beams_instance_id' => env('PUSHER_BEAMS_INSTANCE_ID'),
        'beams_secret_key' => env('PUSHER_BEAMS_SECRET_KEY'),
    ],

    // Social Media APIs
    'social' => [
        'facebook' => [
            'app_id' => env('FACEBOOK_APP_ID'),
            'app_secret' => env('FACEBOOK_APP_SECRET'),
        ],
        'twitter' => [
            'api_key' => env('TWITTER_API_KEY'),
            'api_secret' => env('TWITTER_API_SECRET'),
            'bearer_token' => env('TWITTER_BEARER_TOKEN'),
        ],
    ],

];
