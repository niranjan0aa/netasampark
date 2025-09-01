<?php

use Illuminate\Support\Facades\Route;

// Default route - will be overridden by central/tenant routes
Route::get('/', function () {
    return inertia('Landing');
});
