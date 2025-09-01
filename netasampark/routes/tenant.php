<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the RouteServiceProvider within a group which
| contains the "tenant" middleware group. Now create something great!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    // Dashboard
    Route::get('/', function () {
        return inertia('Dashboard');
    })->name('dashboard');

    // Authentication routes for tenants
    Route::get('/login', function () {
        return inertia('Auth/Login');
    })->name('login');

    Route::post('/login', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Protected tenant routes
    Route::middleware(['auth'])->group(function () {
        // Voter CRM
        Route::prefix('voters')->name('voters.')->group(function () {
            Route::get('/', [App\Http\Controllers\VoterController::class, 'index'])->name('index');
            Route::get('/create', [App\Http\Controllers\VoterController::class, 'create'])->name('create');
            Route::post('/', [App\Http\Controllers\VoterController::class, 'store'])->name('store');
            Route::get('/{voter}', [App\Http\Controllers\VoterController::class, 'show'])->name('show');
            Route::get('/{voter}/edit', [App\Http\Controllers\VoterController::class, 'edit'])->name('edit');
            Route::put('/{voter}', [App\Http\Controllers\VoterController::class, 'update'])->name('update');
            Route::delete('/{voter}', [App\Http\Controllers\VoterController::class, 'destroy'])->name('destroy');
            Route::post('/import', [App\Http\Controllers\VoterController::class, 'import'])->name('import');
        });

        // Campaigns
        Route::prefix('campaigns')->name('campaigns.')->group(function () {
            Route::get('/', [App\Http\Controllers\CampaignController::class, 'index'])->name('index');
            Route::get('/create', [App\Http\Controllers\CampaignController::class, 'create'])->name('create');
            Route::post('/', [App\Http\Controllers\CampaignController::class, 'store'])->name('store');
            Route::get('/{campaign}', [App\Http\Controllers\CampaignController::class, 'show'])->name('show');
            Route::post('/{campaign}/launch', [App\Http\Controllers\CampaignController::class, 'launch'])->name('launch');
        });

        // Communication Hub
        Route::prefix('communications')->name('communications.')->group(function () {
            Route::get('/inbox', [App\Http\Controllers\CommunicationController::class, 'inbox'])->name('inbox');
            Route::get('/templates', [App\Http\Controllers\CommunicationController::class, 'templates'])->name('templates');
            Route::post('/send', [App\Http\Controllers\CommunicationController::class, 'send'])->name('send');
        });

        // Tickets
        Route::prefix('tickets')->name('tickets.')->group(function () {
            Route::get('/', [App\Http\Controllers\TicketController::class, 'index'])->name('index');
            Route::get('/create', [App\Http\Controllers\TicketController::class, 'create'])->name('create');
            Route::post('/', [App\Http\Controllers\TicketController::class, 'store'])->name('store');
            Route::get('/{ticket}', [App\Http\Controllers\TicketController::class, 'show'])->name('show');
            Route::post('/{ticket}/reply', [App\Http\Controllers\TicketController::class, 'reply'])->name('reply');
        });

        // Events & Calendar
        Route::prefix('events')->name('events.')->group(function () {
            Route::get('/', [App\Http\Controllers\EventController::class, 'index'])->name('index');
            Route::get('/calendar', [App\Http\Controllers\EventController::class, 'calendar'])->name('calendar');
            Route::post('/', [App\Http\Controllers\EventController::class, 'store'])->name('store');
            Route::get('/{event}', [App\Http\Controllers\EventController::class, 'show'])->name('show');
        });

        // Surveys & Issues
        Route::prefix('surveys')->name('surveys.')->group(function () {
            Route::get('/', [App\Http\Controllers\SurveyController::class, 'index'])->name('index');
            Route::post('/', [App\Http\Controllers\SurveyController::class, 'store'])->name('store');
        });

        Route::prefix('issues')->name('issues.')->group(function () {
            Route::get('/', [App\Http\Controllers\IssueController::class, 'index'])->name('index');
            Route::post('/', [App\Http\Controllers\IssueController::class, 'store'])->name('store');
        });

        // Analytics
        Route::prefix('analytics')->name('analytics.')->group(function () {
            Route::get('/dashboard', [App\Http\Controllers\AnalyticsController::class, 'dashboard'])->name('dashboard');
            Route::get('/reports', [App\Http\Controllers\AnalyticsController::class, 'reports'])->name('reports');
        });

        // Finance
        Route::prefix('finance')->name('finance.')->group(function () {
            Route::get('/expenses', [App\Http\Controllers\FinanceController::class, 'expenses'])->name('expenses');
            Route::get('/donors', [App\Http\Controllers\FinanceController::class, 'donors'])->name('donors');
            Route::get('/compliance', [App\Http\Controllers\FinanceController::class, 'compliance'])->name('compliance');
        });

        // News Monitoring
        Route::prefix('news')->name('news.')->group(function () {
            Route::get('/', [App\Http\Controllers\NewsController::class, 'index'])->name('index');
            Route::get('/digest', [App\Http\Controllers\NewsController::class, 'digest'])->name('digest');
        });

        // Settings
        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('/', [App\Http\Controllers\SettingsController::class, 'index'])->name('index');
            Route::put('/profile', [App\Http\Controllers\SettingsController::class, 'updateProfile'])->name('profile.update');
            Route::put('/preferences', [App\Http\Controllers\SettingsController::class, 'updatePreferences'])->name('preferences.update');
        });
    });
});