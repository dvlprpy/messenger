<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // --- Users ---
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->string('username')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->unique()->nullable();
            $table->timestamp('birthday');
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->timestamp('registered_at')->useCurrent();
            $table->timestamps();
        });

        // --- Contacts ---
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('contact_user_id')->constrained('users')->onDelete('cascade');
            $table->string('contact_name');
            $table->timestamps();
            $table->unique(['user_id', 'contact_user_id']);
            $table->index(['user_id', 'contact_user_id']);
        });

        // --- Chats ---
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['private', 'group'])->default('private');
            $table->string('title')->nullable(); // فقط برای گروه
            $table->jsonb('settings')->nullable(); // رنگ پس‌زمینه، فونت، ...
            $table->timestamps();
        });

        // --- Chat_User Pivot ---
        Schema::create('chat_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('role', ['member', 'admin'])->default('member');
            $table->timestamps();
            $table->unique(['chat_id', 'user_id']);
            $table->index(['chat_id', 'user_id']);
        });

        // --- Messages ---
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade');
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->jsonb('content'); // { "text": "سلام", "file": null, "image": null }
            $table->timestamp('sent_at')->useCurrent();
            $table->boolean('edited')->default(false);
            $table->timestamps();

            $table->index(['chat_id', 'sender_id']);
        });

        // --- Message Statuses ---
        Schema::create('message_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['sent', 'delivered', 'seen'])->default('sent');
            $table->timestamp('updated_at')->useCurrent();

            $table->unique(['message_id', 'user_id']);
            $table->index(['message_id', 'user_id']);
        });

        // --- User Settings ---
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->jsonb('preferences')->nullable(); 
            // {"theme": "dark", "font": "iranSans", "language": "fa"}
            $table->timestamps();
        });

        // --- Call History ---
        Schema::create('calls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->enum('call_type', ['incoming', 'outgoing', 'missed'])->default('outgoing');
            $table->integer('duration')->default(0); // مدت زمان به ثانیه
            $table->timestamp('call_time')->useCurrent();
            $table->timestamps();

            $table->index(['caller_id', 'receiver_id']);
        });

        // --- Call Participants (Pivot for group calls) ---
        Schema::create('call_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('call_id')->constrained('calls')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['joined', 'left', 'missed'])->default('joined');
            $table->timestamps();

            $table->unique(['call_id', 'user_id']);
            $table->index(['call_id', 'user_id']);
        });

        // --- Stories ---
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('media_url');
            $table->enum('type', ['image', 'video']);
            $table->text('caption')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('expires_at')->nullable();

            $table->index('expires_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stories');
        Schema::dropIfExists('call_participants');
        Schema::dropIfExists('calls');
        Schema::dropIfExists('user_settings');
        Schema::dropIfExists('message_statuses');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('chat_user');
        Schema::dropIfExists('chats');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('users');
    }
};