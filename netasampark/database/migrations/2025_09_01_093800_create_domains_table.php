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
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->string('domain')->unique();
            $table->string('tenant_id');
            $table->boolean('is_primary')->default(false);
            $table->enum('certificate_status', ['pending', 'issued', 'failed', 'expired'])->default('pending');
            $table->timestamp('certificate_issued_at')->nullable();
            $table->timestamp('certificate_expires_at')->nullable();
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
            $table->index(['tenant_id']);
            $table->index(['is_primary']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};
