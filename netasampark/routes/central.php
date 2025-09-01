<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\PreventAccessFromTenantDomains;

/*
|--------------------------------------------------------------------------
| Central Routes
|--------------------------------------------------------------------------
|
| Here you can register the central/admin routes for your application.
| These routes handle tenant management, billing, partner management, etc.
|
*/

Route::middleware([
    'web',
    PreventAccessFromTenantDomains::class,
])->group(function () {
    
    // Landing page
    Route::get('/', function () {
        return inertia('Landing');
    })->name('landing');

    // Tenant registration
    Route::get('/register', [App\Http\Controllers\Central\TenantController::class, 'showRegistration'])->name('tenant.register');
    Route::post('/register', [App\Http\Controllers\Central\TenantController::class, 'register'])->name('tenant.store');

    // Admin authentication
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/login', function () {
            return inertia('Admin/Login');
        })->name('login');

        Route::post('/login', [App\Http\Controllers\Central\AdminAuthController::class, 'login']);
        Route::post('/logout', [App\Http\Controllers\Central\AdminAuthController::class, 'logout'])->name('logout');

        // Protected admin routes
        Route::middleware(['auth:admin'])->group(function () {
            Route::get('/dashboard', [App\Http\Controllers\Central\AdminController::class, 'dashboard'])->name('dashboard');

            // Tenant Management
            Route::prefix('tenants')->name('tenants.')->group(function () {
                Route::get('/', [App\Http\Controllers\Central\TenantController::class, 'index'])->name('index');
                Route::get('/{tenant}', [App\Http\Controllers\Central\TenantController::class, 'show'])->name('show');
                Route::put('/{tenant}/status', [App\Http\Controllers\Central\TenantController::class, 'updateStatus'])->name('status.update');
                Route::delete('/{tenant}', [App\Http\Controllers\Central\TenantController::class, 'destroy'])->name('destroy');
            });

            // Plan Management
            Route::prefix('plans')->name('plans.')->group(function () {
                Route::get('/', [App\Http\Controllers\Central\PlanController::class, 'index'])->name('index');
                Route::post('/', [App\Http\Controllers\Central\PlanController::class, 'store'])->name('store');
                Route::put('/{plan}', [App\Http\Controllers\Central\PlanController::class, 'update'])->name('update');
            });

            // Billing Management
            Route::prefix('billing')->name('billing.')->group(function () {
                Route::get('/', [App\Http\Controllers\Central\BillingController::class, 'index'])->name('index');
                Route::get('/invoices', [App\Http\Controllers\Central\BillingController::class, 'invoices'])->name('invoices');
                Route::post('/invoices/{invoice}/send', [App\Http\Controllers\Central\BillingController::class, 'sendInvoice'])->name('invoices.send');
            });

            // Partner Management
            Route::prefix('partners')->name('partners.')->group(function () {
                Route::get('/', [App\Http\Controllers\Central\PartnerController::class, 'index'])->name('index');
                Route::post('/', [App\Http\Controllers\Central\PartnerController::class, 'store'])->name('store');
                Route::get('/{partner}', [App\Http\Controllers\Central\PartnerController::class, 'show'])->name('show');
                Route::put('/{partner}', [App\Http\Controllers\Central\PartnerController::class, 'update'])->name('update');
            });

            // Analytics
            Route::prefix('analytics')->name('analytics.')->group(function () {
                Route::get('/overview', [App\Http\Controllers\Central\AnalyticsController::class, 'overview'])->name('overview');
                Route::get('/tenants', [App\Http\Controllers\Central\AnalyticsController::class, 'tenants'])->name('tenants');
                Route::get('/revenue', [App\Http\Controllers\Central\AnalyticsController::class, 'revenue'])->name('revenue');
            });

            // System Settings
            Route::prefix('settings')->name('settings.')->group(function () {
                Route::get('/', [App\Http\Controllers\Central\SettingsController::class, 'index'])->name('index');
                Route::put('/system', [App\Http\Controllers\Central\SettingsController::class, 'updateSystem'])->name('system.update');
            });
        });
    });

    // Partner/Affiliate public routes
    Route::prefix('partner')->name('partner.')->group(function () {
        Route::get('/register', [App\Http\Controllers\Central\PartnerController::class, 'showRegistration'])->name('register');
        Route::post('/register', [App\Http\Controllers\Central\PartnerController::class, 'registerPartner'])->name('store');
        
        Route::get('/login', [App\Http\Controllers\Central\PartnerController::class, 'showLogin'])->name('login');
        Route::post('/login', [App\Http\Controllers\Central\PartnerController::class, 'login']);

        Route::middleware(['auth:partner'])->group(function () {
            Route::get('/dashboard', [App\Http\Controllers\Central\PartnerController::class, 'dashboard'])->name('dashboard');
            Route::get('/tenants', [App\Http\Controllers\Central\PartnerController::class, 'tenants'])->name('tenants');
            Route::get('/earnings', [App\Http\Controllers\Central\PartnerController::class, 'earnings'])->name('earnings');
        });
    });

    // API routes for webhooks
    Route::prefix('webhooks')->name('webhooks.')->group(function () {
        Route::post('/razorpay', [App\Http\Controllers\Central\WebhookController::class, 'razorpay'])->name('razorpay');
        Route::post('/sms', [App\Http\Controllers\Central\WebhookController::class, 'sms'])->name('sms');
        Route::post('/whatsapp', [App\Http\Controllers\Central\WebhookController::class, 'whatsapp'])->name('whatsapp');
    });
});