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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_id');
            $table->enum('type', ['sms', 'whatsapp', 'voice', 'email']); // Separate wallets for different services
            $table->decimal('balance', 10, 2)->default(0);
            $table->decimal('reserved_balance', 10, 2)->default(0); // For pending transactions
            $table->boolean('auto_recharge')->default(false);
            $table->decimal('auto_recharge_threshold', 10, 2)->nullable();
            $table->decimal('auto_recharge_amount', 10, 2)->nullable();
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
            $table->unique(['tenant_id', 'type']);
            $table->index(['tenant_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
