<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VoterController;
use App\Http\Controllers\CommunicationController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\SettingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Main SPA route - all frontend routes will be handled by Inertia.js
Route::get('/{any}', [AppController::class, 'index'])->where('any', '.*');

// API routes for the frontend
Route::prefix('api')->group(function () {
    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/activities', [DashboardController::class, 'activities']);
    
    // Voter CRM
    Route::get('/voters', [VoterController::class, 'index']);
    Route::post('/voters', [VoterController::class, 'store']);
    Route::get('/voters/{voter}', [VoterController::class, 'show']);
    Route::put('/voters/{voter}', [VoterController::class, 'update']);
    Route::delete('/voters/{voter}', [VoterController::class, 'destroy']);
    Route::post('/voters/import', [VoterController::class, 'import']);
    Route::get('/voters/export', [VoterController::class, 'export']);
    
    // Communication Hub
    Route::get('/communication/campaigns', [CommunicationController::class, 'campaigns']);
    Route::post('/communication/campaigns', [CommunicationController::class, 'storeCampaign']);
    Route::get('/communication/templates', [CommunicationController::class, 'templates']);
    Route::post('/communication/templates', [CommunicationController::class, 'storeTemplate']);
    Route::get('/communication/inbox', [CommunicationController::class, 'inbox']);
    Route::post('/communication/send', [CommunicationController::class, 'send']);
    
    // Ticketing
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
    Route::put('/tickets/{ticket}', [TicketController::class, 'update']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);
    
    // Calendar & Events
    Route::get('/calendar/events', [CalendarController::class, 'events']);
    Route::post('/calendar/events', [CalendarController::class, 'store']);
    Route::get('/calendar/events/{event}', [CalendarController::class, 'show']);
    Route::put('/calendar/events/{event}', [CalendarController::class, 'update']);
    Route::delete('/calendar/events/{event}', [CalendarController::class, 'destroy']);
    
    // Local News
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/summary', [NewsController::class, 'summary']);
    Route::post('/news/ingest', [NewsController::class, 'ingest']);
    
    // Surveys & Issues
    Route::get('/surveys', [SurveyController::class, 'index']);
    Route::post('/surveys', [SurveyController::class, 'store']);
    Route::get('/surveys/{survey}', [SurveyController::class, 'show']);
    Route::get('/issues', [SurveyController::class, 'issues']);
    Route::post('/issues', [SurveyController::class, 'storeIssue']);
    
    // Analytics
    Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboard']);
    Route::get('/analytics/campaign', [AnalyticsController::class, 'campaign']);
    Route::get('/analytics/voter', [AnalyticsController::class, 'voter']);
    Route::get('/analytics/predictions', [AnalyticsController::class, 'predictions']);
    
    // Finance
    Route::get('/finance/expenses', [FinanceController::class, 'expenses']);
    Route::post('/finance/expenses', [FinanceController::class, 'storeExpense']);
    Route::get('/finance/donors', [FinanceController::class, 'donors']);
    Route::post('/finance/donors', [FinanceController::class, 'storeDonor']);
    Route::get('/finance/compliance', [FinanceController::class, 'compliance']);
    
    // Partners
    Route::get('/partners', [PartnerController::class, 'index']);
    Route::post('/partners', [PartnerController::class, 'store']);
    Route::get('/partners/commissions', [PartnerController::class, 'commissions']);
    Route::get('/partners/payouts', [PartnerController::class, 'payouts']);
    
    // Settings
    Route::get('/settings/profile', [SettingController::class, 'profile']);
    Route::put('/settings/profile', [SettingController::class, 'updateProfile']);
    Route::get('/settings/notifications', [SettingController::class, 'notifications']);
    Route::put('/settings/notifications', [SettingController::class, 'updateNotifications']);
    Route::get('/settings/billing', [SettingController::class, 'billing']);
    Route::post('/settings/billing/subscribe', [SettingController::class, 'subscribe']);
});

// Authentication routes (if using Laravel Breeze/Jetstream)
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return inertia('Auth/Login');
    })->name('login');
    
    Route::get('/register', function () {
        return inertia('Auth/Register');
    })->name('register');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', function () {
        Auth::logout();
        return redirect('/login');
    })->name('logout');
});