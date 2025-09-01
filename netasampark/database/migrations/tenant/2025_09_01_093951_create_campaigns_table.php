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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('type', ['sms', 'whatsapp', 'email', 'voice', 'mixed']);
            $table->enum('status', ['draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled']);
            $table->json('target_segments'); // Voter segments to target
            $table->text('message_content');
            $table->json('message_templates')->nullable(); // Multi-language templates
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->foreignId('created_by')->constrained('users');
            
            // Campaign statistics
            $table->integer('total_recipients')->default(0);
            $table->integer('sent_count')->default(0);
            $table->integer('delivered_count')->default(0);
            $table->integer('failed_count')->default(0);
            $table->integer('reply_count')->default(0);
            $table->integer('click_count')->default(0);
            
            // Budget and costs
            $table->decimal('estimated_cost', 10, 2)->default(0);
            $table->decimal('actual_cost', 10, 2)->default(0);
            
            $table->timestamps();

            $table->index(['type']);
            $table->index(['status']);
            $table->index(['created_by']);
            $table->index(['scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
