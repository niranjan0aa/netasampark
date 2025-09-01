<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Domain;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::with('domains')
            ->latest()
            ->paginate(20);

        return inertia('Admin/Tenants/Index', [
            'tenants' => $tenants,
        ]);
    }

    public function show(Tenant $tenant)
    {
        $tenant->load(['domains', 'subscription.plan']);

        return inertia('Admin/Tenants/Show', [
            'tenant' => $tenant,
        ]);
    }

    public function showRegistration()
    {
        return inertia('TenantRegistration');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,data->email',
            'subdomain' => 'required|string|max:63|unique:domains,domain|regex:/^[a-z0-9\-]+$/',
            'plan' => 'required|string|in:starter,professional,enterprise',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|email',
            'admin_password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:15',
            'organization' => 'nullable|string|max:255',
        ]);

        // Create tenant
        $tenant = Tenant::create([
            'id' => Str::uuid(),
            'name' => $validated['name'],
            'plan' => $validated['plan'],
            'status' => 'trial',
            'trial_ends_at' => now()->addDays(14),
            'data' => [
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'organization' => $validated['organization'],
                'admin_name' => $validated['admin_name'],
                'admin_email' => $validated['admin_email'],
            ],
        ]);

        // Create domain
        $domain = $tenant->domains()->create([
            'domain' => $validated['subdomain'] . '.netasampark.com',
            'is_primary' => true,
        ]);

        // TODO: Create admin user in tenant database
        // TODO: Send welcome email
        // TODO: Provision SSL certificate

        return redirect()->route('tenant.success', ['domain' => $domain->domain]);
    }

    public function updateStatus(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,suspended,trial,expired',
        ]);

        $tenant->update(['status' => $validated['status']]);

        return back()->with('success', 'Tenant status updated successfully.');
    }

    public function destroy(Tenant $tenant)
    {
        // TODO: Add proper cleanup logic
        $tenant->delete();

        return back()->with('success', 'Tenant deleted successfully.');
    }
}
