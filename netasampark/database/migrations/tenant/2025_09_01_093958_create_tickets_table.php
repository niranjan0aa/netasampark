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
        // First create ticket categories
        Schema::create('ticket_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('color', 7)->default('#3B82F6'); // Hex color
            $table->integer('sla_hours')->default(24); // SLA in hours
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Then ticket queues
        Schema::create('ticket_queues', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('auto_assign_rules')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Main tickets table
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_number')->unique();
            $table->string('subject');
            $table->text('description');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['open', 'in_progress', 'pending_customer', 'resolved', 'closed']);
            $table->foreignId('category_id')->constrained('ticket_categories');
            $table->foreignId('queue_id')->constrained('ticket_queues');
            $table->foreignId('voter_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            
            // SLA tracking
            $table->timestamp('sla_due_at')->nullable();
            $table->boolean('sla_breached')->default(false);
            $table->timestamp('first_response_at')->nullable();
            $table->timestamp('resolved_at')->nullable();
            
            // Channel information
            $table->enum('source_channel', ['whatsapp', 'sms', 'email', 'ivr', 'web', 'manual']);
            $table->string('source_reference')->nullable(); // Original message ID
            
            // Customer information
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('customer_email')->nullable();
            
            $table->timestamps();

            $table->index(['status']);
            $table->index(['priority']);
            $table->index(['category_id']);
            $table->index(['queue_id']);
            $table->index(['assigned_to']);
            $table->index(['voter_id']);
            $table->index(['sla_due_at']);
            $table->index(['ticket_number']);
        });

        // Ticket replies/comments
        Schema::create('ticket_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->text('content');
            $table->boolean('is_internal')->default(false); // Internal notes vs customer replies
            $table->json('attachments')->nullable();
            $table->timestamps();

            $table->index(['ticket_id']);
            $table->index(['user_id']);
            $table->index(['is_internal']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_replies');
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('ticket_queues');
        Schema::dropIfExists('ticket_categories');
    }
};
