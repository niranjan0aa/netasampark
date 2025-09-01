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
        // First create states table
        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 5); // State code
            $table->timestamps();
            
            $table->index(['code']);
        });

        // Then districts table
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('state_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('code', 10);
            $table->timestamps();
            
            $table->index(['state_id']);
            $table->index(['code']);
        });

        // Then constituencies table
        Schema::create('constituencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('code', 10);
            $table->enum('type', ['lok_sabha', 'vidhan_sabha']);
            $table->integer('total_voters')->default(0);
            $table->json('boundaries')->nullable(); // GeoJSON data
            $table->timestamps();
            
            $table->index(['district_id']);
            $table->index(['code']);
            $table->index(['type']);
        });

        // Then wards table
        Schema::create('wards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('constituency_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('number', 10);
            $table->integer('total_voters')->default(0);
            $table->json('boundaries')->nullable();
            $table->timestamps();
            
            $table->index(['constituency_id']);
            $table->index(['number']);
        });

        // Finally booths table
        Schema::create('booths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ward_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('number', 10);
            $table->string('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->integer('total_voters')->default(0);
            $table->timestamps();
            
            $table->index(['ward_id']);
            $table->index(['number']);
            $table->index(['latitude', 'longitude']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booths');
        Schema::dropIfExists('wards');
        Schema::dropIfExists('constituencies');
        Schema::dropIfExists('districts');
        Schema::dropIfExists('states');
    }
};
