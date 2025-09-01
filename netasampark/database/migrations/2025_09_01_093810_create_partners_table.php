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
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->enum('type', ['affiliate', 'reseller', 'partner']);
            $table->enum('status', ['active', 'inactive', 'suspended']);
            $table->decimal('commission_rate', 5, 2)->default(0); // Percentage
            $table->string('referral_code')->unique();
            $table->json('kyc_data')->nullable();
            $table->string('gst_number')->nullable();
            $table->json('bank_details')->nullable();
            $table->decimal('total_earnings', 10, 2)->default(0);
            $table->decimal('pending_payout', 10, 2)->default(0);
            $table->timestamp('last_payout_at')->nullable();
            $table->timestamps();

            $table->index(['type']);
            $table->index(['status']);
            $table->index(['referral_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
