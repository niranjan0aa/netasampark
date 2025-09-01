<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class TenancyServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Additional tenancy configurations can be added here
    }
}
