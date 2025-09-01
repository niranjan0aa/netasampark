<?php

namespace App\Services;

use App\Models\Tenant;
use App\Models\Domain;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Stancl\Tenancy\Database\DatabaseManager;

class TenantService
{
    public function __construct(
        private DatabaseManager $databaseManager
    ) {}

    /**
     * Create a new tenant with all required setup
     */
    public function createTenant(array $data): Tenant
    {
        return DB::transaction(function () use ($data) {
            // Create tenant
            $tenant = Tenant::create([
                'id' => Str::uuid(),
                'name' => $data['name'],
                'plan' => $data['plan'],
                'status' => 'trial',
                'trial_ends_at' => now()->addDays(14),
                'data' => [
                    'email' => $data['email'],
                    'phone' => $data['phone'] ?? null,
                    'organization' => $data['organization'] ?? null,
                    'admin_name' => $data['admin_name'],
                    'admin_email' => $data['admin_email'],
                ],
            ]);

            // Create primary domain
            $domain = $tenant->domains()->create([
                'domain' => $data['subdomain'] . '.netasampark.com',
                'is_primary' => true,
                'certificate_status' => 'pending',
            ]);

            // Create tenant database
            $this->databaseManager->createDatabase($tenant);

            // Run tenant migrations
            tenancy()->initialize($tenant);
            
            // Create admin user in tenant database
            $adminUser = User::create([
                'name' => $data['admin_name'],
                'email' => $data['admin_email'],
                'password' => Hash::make($data['admin_password']),
                'status' => 'active',
            ]);

            // Assign admin role (if using Spatie permissions)
            // $adminUser->assignRole('admin');

            tenancy()->end();

            // TODO: Send welcome email
            // TODO: Provision SSL certificate
            // TODO: Setup default data (ticket categories, etc.)

            return $tenant;
        });
    }

    /**
     * Suspend a tenant (stop access but keep data)
     */
    public function suspendTenant(Tenant $tenant): void
    {
        $tenant->update(['status' => 'suspended']);
        
        // TODO: Add logic to prevent access
        // TODO: Send suspension notification
    }

    /**
     * Reactivate a suspended tenant
     */
    public function reactivateTenant(Tenant $tenant): void
    {
        $tenant->update(['status' => 'active']);
        
        // TODO: Send reactivation notification
    }

    /**
     * Delete a tenant and all associated data
     */
    public function deleteTenant(Tenant $tenant): void
    {
        DB::transaction(function () use ($tenant) {
            // Delete tenant database
            $this->databaseManager->deleteDatabase($tenant);
            
            // Delete tenant record (domains will be cascade deleted)
            $tenant->delete();
            
            // TODO: Cleanup S3 files
            // TODO: Send deletion confirmation
        });
    }

    /**
     * Check if tenant is over quota
     */
    public function checkQuotas(Tenant $tenant): array
    {
        $plan = $this->getPlanLimits($tenant->plan);
        $usage = $this->getTenantUsage($tenant);

        $quotaStatus = [];
        
        foreach ($plan as $metric => $limit) {
            if ($limit === -1) continue; // Unlimited
            
            $currentUsage = $usage[$metric] ?? 0;
            $percentage = $limit > 0 ? ($currentUsage / $limit) * 100 : 0;
            
            $quotaStatus[$metric] = [
                'limit' => $limit,
                'usage' => $currentUsage,
                'percentage' => $percentage,
                'over_quota' => $percentage > 100,
                'warning' => $percentage > 80,
            ];
        }

        return $quotaStatus;
    }

    /**
     * Get plan limits for a given plan
     */
    private function getPlanLimits(string $planSlug): array
    {
        $plans = [
            'starter' => [
                'voters' => 10000,
                'sms_monthly' => 5000,
                'whatsapp_monthly' => 2000,
                'email_monthly' => 10000,
                'voice_minutes' => 100,
                'storage_gb' => 5,
                'users' => 5,
            ],
            'professional' => [
                'voters' => 50000,
                'sms_monthly' => 25000,
                'whatsapp_monthly' => 10000,
                'email_monthly' => 50000,
                'voice_minutes' => 500,
                'storage_gb' => 25,
                'users' => 25,
            ],
            'enterprise' => [
                'voters' => -1,
                'sms_monthly' => -1,
                'whatsapp_monthly' => -1,
                'email_monthly' => -1,
                'voice_minutes' => -1,
                'storage_gb' => 100,
                'users' => 100,
            ],
        ];

        return $plans[$planSlug] ?? $plans['starter'];
    }

    /**
     * Get current tenant usage
     */
    private function getTenantUsage(Tenant $tenant): array
    {
        // This would query tenant database for current usage
        // For now, return dummy data
        return [
            'voters' => 0,
            'sms_monthly' => 0,
            'whatsapp_monthly' => 0,
            'email_monthly' => 0,
            'voice_minutes' => 0,
            'storage_gb' => 0,
            'users' => 1,
        ];
    }
}