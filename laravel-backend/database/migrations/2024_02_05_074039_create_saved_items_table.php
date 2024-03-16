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
        Schema::create('saved_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrained('users'); // Assuming users table for authors
            $table->foreignId('user_id')->constrained('users'); // Assuming users table for authenticated users
            $table->string('image_path');
            // Add other fields as needed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_items');
    }
};
