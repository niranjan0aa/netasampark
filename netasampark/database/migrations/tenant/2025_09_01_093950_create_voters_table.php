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
        Schema::create('voters', function (Blueprint $table) {
            $table->id();
            $table->string('voter_id')->unique(); // Official voter ID
            $table->string('name');
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->enum('gender', ['male', 'female', 'other']);
            $table->date('date_of_birth')->nullable();
            $table->integer('age')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->text('address');
            $table->string('pincode', 10)->nullable();
            $table->foreignId('booth_id')->constrained()->onDelete('cascade');
            $table->foreignId('ward_id')->constrained()->onDelete('cascade');
            $table->foreignId('constituency_id')->constrained()->onDelete('cascade');
            
            // Demographics
            $table->string('caste')->nullable();
            $table->string('religion')->nullable();
            $table->string('occupation')->nullable();
            $table->enum('education', ['illiterate', 'primary', 'secondary', 'graduate', 'postgraduate'])->nullable();
            $table->enum('economic_status', ['bpl', 'apl', 'middle_class', 'upper_middle', 'rich'])->nullable();
            
            // Political data
            $table->enum('support_level', ['strong_support', 'lean_support', 'neutral', 'lean_opposition', 'strong_opposition'])->nullable();
            $table->boolean('is_influencer')->default(false);
            $table->integer('influence_score')->default(0);
            $table->json('tags')->nullable(); // Custom tags
            
            // Household data
            $table->string('household_id')->nullable();
            $table->boolean('is_head_of_household')->default(false);
            
            // Consent management
            $table->boolean('sms_consent')->default(false);
            $table->boolean('whatsapp_consent')->default(false);
            $table->boolean('email_consent')->default(false);
            $table->boolean('voice_consent')->default(false);
            $table->timestamp('consent_updated_at')->nullable();
            
            // Engagement tracking
            $table->timestamp('last_contacted_at')->nullable();
            $table->integer('total_interactions')->default(0);
            $table->decimal('engagement_score', 5, 2)->default(0);
            
            $table->timestamps();

            $table->index(['booth_id']);
            $table->index(['ward_id']);
            $table->index(['constituency_id']);
            $table->index(['voter_id']);
            $table->index(['phone']);
            $table->index(['email']);
            $table->index(['support_level']);
            $table->index(['is_influencer']);
            $table->index(['household_id']);
            $table->index(['sms_consent', 'whatsapp_consent', 'email_consent']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voters');
    }
};
