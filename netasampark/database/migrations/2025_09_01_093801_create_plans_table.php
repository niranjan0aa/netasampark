<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price_monthly', 10, 2);
            $table->decimal('price_annual', 10, 2);
            $table->json('features'); // Array of enabled features/modules
            $table->json('limits'); // Quotas: contacts, messages, storage, etc.
            $table->boolean('is_active')->default(true);
            $table->integer('trial_days')->default(14);
            $table->timestamps();

            $table->index(['is_active']);
            $table->index(['slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
