<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter',
                'slug' => 'starter',
                'description' => 'Perfect for small constituencies and local campaigns',
                'price_monthly' => 2999.00,
                'price_annual' => 29990.00, // 2 months free
                'features' => [
                    'voter_crm',
                    'basic_communication',
                    'basic_analytics',
                    'ticketing',
                    'calendar',
                ],
                'limits' => [
                    'voters' => 10000,
                    'sms_monthly' => 5000,
                    'whatsapp_monthly' => 2000,
                    'email_monthly' => 10000,
                    'voice_minutes' => 100,
                    'storage_gb' => 5,
                    'users' => 5,
                ],
                'trial_days' => 14,
                'is_active' => true,
            ],
            [
                'name' => 'Professional',
                'slug' => 'professional',
                'description' => 'Ideal for assembly constituencies and medium campaigns',
                'price_monthly' => 9999.00,
                'price_annual' => 99990.00,
                'features' => [
                    'voter_crm',
                    'advanced_communication',
                    'advanced_analytics',
                    'predictions',
                    'ticketing',
                    'calendar',
                    'surveys',
                    'issues',
                    'news_monitoring',
                    'finance_basic',
                ],
                'limits' => [
                    'voters' => 50000,
                    'sms_monthly' => 25000,
                    'whatsapp_monthly' => 10000,
                    'email_monthly' => 50000,
                    'voice_minutes' => 500,
                    'storage_gb' => 25,
                    'users' => 25,
                ],
                'trial_days' => 14,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'description' => 'For parliamentary constituencies and large-scale campaigns',
                'price_monthly' => 29999.00,
                'price_annual' => 299990.00,
                'features' => [
                    'voter_crm',
                    'advanced_communication',
                    'advanced_analytics',
                    'predictions',
                    'ticketing',
                    'calendar',
                    'surveys',
                    'issues',
                    'news_monitoring',
                    'finance_advanced',
                    'partner_management',
                    'white_label',
                    'api_access',
                    'custom_integrations',
                ],
                'limits' => [
                    'voters' => -1, // Unlimited
                    'sms_monthly' => -1,
                    'whatsapp_monthly' => -1,
                    'email_monthly' => -1,
                    'voice_minutes' => -1,
                    'storage_gb' => 100,
                    'users' => 100,
                ],
                'trial_days' => 30,
                'is_active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            DB::table('plans')->insert([
                ...$plan,
                'features' => json_encode($plan['features']),
                'limits' => json_encode($plan['limits']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
