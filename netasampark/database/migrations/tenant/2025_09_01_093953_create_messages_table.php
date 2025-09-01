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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('voter_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('channel', ['sms', 'whatsapp', 'email', 'voice']);
            $table->enum('direction', ['outbound', 'inbound']);
            $table->enum('status', ['pending', 'sent', 'delivered', 'failed', 'read', 'replied']);
            
            // Contact details
            $table->string('to_number')->nullable();
            $table->string('to_email')->nullable();
            $table->string('from_number')->nullable();
            $table->string('from_email')->nullable();
            
            // Message content
            $table->text('content');
            $table->json('media_urls')->nullable(); // For images, documents, etc.
            $table->string('template_id')->nullable(); // DLT/BSP template ID
            $table->json('template_params')->nullable();
            
            // Delivery tracking
            $table->string('external_id')->nullable(); // Gateway message ID
            $table->text('failure_reason')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamp('replied_at')->nullable();
            
            // Cost tracking
            $table->decimal('cost', 8, 4)->default(0);
            $table->string('gateway_used')->nullable();
            
            // Conversation threading
            $table->string('conversation_id')->nullable();
            $table->foreignId('parent_message_id')->nullable()->constrained('messages');
            
            $table->timestamps();

            $table->index(['campaign_id']);
            $table->index(['voter_id']);
            $table->index(['channel']);
            $table->index(['direction']);
            $table->index(['status']);
            $table->index(['conversation_id']);
            $table->index(['external_id']);
            $table->index(['to_number']);
            $table->index(['to_email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
