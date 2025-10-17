<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ---------------------
        // users
        // ---------------------
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->string('username')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->unique()->nullable();
            $table->date('birthday')->nullable();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->timestamp('registered_at')->useCurrent();
            $table->timestamps();
        });

        // ---------------------
        // contacts
        // ---------------------
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('contact_user_id')->constrained('users')->onDelete('cascade');
            $table->string('contact_name')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'contact_user_id']);
            $table->index(['user_id', 'contact_user_id']);
        });

        // ---------------------
        // chats
        // ---------------------
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['private', 'group'])->default('private');
            $table->string('title')->nullable(); // فقط برای گروه
            $table->string('photo')->nullable(); // عکس گروه
            $table->jsonb('settings')->nullable(); // رنگ پس‌زمینه، فونت، ...
            $table->timestamps();
        });

        // ---------------------
        // chat_user pivot
        // ---------------------
        Schema::create('chat_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('role', ['member', 'admin', 'owner'])->default('member');
            $table->timestamps();

            $table->unique(['chat_id', 'user_id']);
            $table->index(['chat_id', 'user_id']);
        });

        // ---------------------
        // messages
        // ---------------------
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade');
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->text('content')->nullable();
            $table->timestamp('sent_at')->useCurrent()->index();
            $table->boolean('edited')->default(false);
            $table->timestamps();

            $table->index(['chat_id', 'sender_id', 'sent_at']);
        });

        // ---------------------
        // message_attachments
        // ---------------------
        Schema::create('message_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
            $table->string('file_type'); // image, video, audio, document, sticker, etc.
            $table->string('file_name')->nullable();
            $table->text('file_url'); // مسیر فایل در storage یا CDN (text برای طولانی بودن URL)
            $table->bigInteger('file_size')->nullable(); // به بایت
            $table->jsonb('metadata')->nullable(); // ابعاد تصویر، طول ویدیو و غیره
            $table->timestamps();

            $table->index(['message_id', 'file_type']);
        });

        // ---------------------
        // message_statuses
        // ---------------------
        Schema::create('message_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['sent', 'delivered', 'seen'])->default('sent');
            $table->timestamp('updated_at')->useCurrent();
            $table->timestamps();

            $table->unique(['message_id', 'user_id']);
            $table->index(['message_id', 'user_id', 'status']);
            // $table->index(['user_id', 'status']);
        });

        // ---------------------
        // message_scheduling
        // ---------------------
        Schema::create('message_scheduling', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade');
            $table->text('content')->nullable();
            $table->jsonb('attachments')->nullable();
            $table->enum('type', ['text', 'image', 'video', 'file'])->default('text');
            $table->timestamp('schedule_for')->index();
            $table->boolean('is_sent')->default(false);
            $table->timestamps();
        });

        // ---------------------
        // reaction_types (create BEFORE message_reactions)
        // ---------------------
        Schema::create('reaction_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // مثلا: like, heart, laugh, fire
            $table->string('emoji')->nullable(); // مثلا: 👍 😂 ❤️ 🔥
            $table->boolean('is_custom')->default(false);
            $table->string('image')->nullable(); // در صورتی که واکنش با استیکر یا ایموجی سفارشی باشه
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        // Optionally seed default reaction types
        DB::table('reaction_types')->insertOrIgnore([
            ['name' => 'like', 'emoji' => '👍', 'is_custom' => false, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'love', 'emoji' => '❤️', 'is_custom' => false, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'laugh', 'emoji' => '😂', 'is_custom' => false, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'fire', 'emoji' => '🔥', 'is_custom' => false, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'sad', 'emoji' => '😢', 'is_custom' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // ---------------------
        // message_reactions (depends on reaction_types)
        // ---------------------
        Schema::create('message_reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('reaction_id')->constrained('reaction_types')->onDelete('cascade');
            $table->timestamps();

            // هر کاربر فقط یک واکنش از یک نوع به یک پیام می‌تونه بده
            $table->unique(['message_id', 'user_id', 'reaction_id']);
            $table->index(['message_id', 'reaction_id']);
        });

        // ---------------------
        // pinned_messages
        // ---------------------
        Schema::create('pinned_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade');
            $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
            $table->foreignId('pinned_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['chat_id', 'message_id']);
        });

        // ---------------------
        // user_settings
        // ---------------------
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // بخش‌های اصلی تنظیمات
            $table->jsonb('personal_info')->nullable();
            $table->jsonb('notification_and_sounds')->nullable();
            $table->jsonb('privacy_and_security')->nullable();
            $table->jsonb('chat_settings')->nullable();
            $table->jsonb('folders')->nullable();
            $table->jsonb('advanced')->nullable();
            $table->jsonb('speakers_and_camera')->nullable();
            $table->jsonb('languages')->nullable();

            $table->timestamps();
            $table->unique('user_id');
        });

        // ---------------------
        // chat_preferences (per-user per-chat)
        // ---------------------
        Schema::create('chat_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade');
            $table->jsonb('preferences')->nullable(); // فونت خاص، رنگ پس‌زمینه خاص، mute، ...
            $table->timestamps();

            $table->unique(['user_id', 'chat_id']);
        });

        // ---------------------
        // user_devices
        // ---------------------
        Schema::create('user_devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('device_name');
            $table->string('device_type')->nullable(); /* web, mobile, desktop */
            $table->string('os')->nullable(); /* windows, mac, linux, ios, android */
            $table->string('device_id')->nullable(); /* Get Device UUID or identifier */
            $table->boolean('is_active')->default(true); /* برای دستگاه های بلاک شده یا غیر فعال */
            $table->string('device_ip')->nullable();
            $table->string('device_location')->nullable();
            $table->timestamp('last_activity')->nullable();
            $table->boolean('current_device')->default(false);
            // برای ذخیره اطلاعات و تنظیمات خاص دستگاه
            $table->jsonb('device_info')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'current_device']);
            $table->index('device_id');
        });

        // ---------------------
        // global_settings (key-value)
        // ---------------------
        Schema::create('global_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // مثل "faq", "support", "policy", "terms"
            $table->jsonb('value')->nullable(); // محتوای مرتبط با اون کلید
            $table->timestamps();

            $table->index('key');
        });

        // ---------------------
        // calls
        // ---------------------
        Schema::create('calls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->enum('call_type', ['incoming', 'outgoing', 'missed'])->default('outgoing');
            $table->enum('status', ['ended', 'missed', 'ongoing'])->default('ended');
            $table->integer('duration')->default(0); // مدت زمان به ثانیه
            $table->timestamp('call_time')->useCurrent();
            $table->timestamps();

            $table->index(['caller_id', 'receiver_id']);
        });

        // ---------------------
        // call_participants
        // ---------------------
        Schema::create('call_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('call_id')->constrained('calls')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['joined', 'left', 'missed'])->default('joined');
            $table->timestamp('joined_at')->nullable();
            $table->timestamp('left_at')->nullable();
            $table->timestamps();

            $table->unique(['call_id', 'user_id']);
            $table->index(['call_id', 'user_id']);
        });

        // ---------------------
        // stories
        // ---------------------
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

        // ---------------------
        // bots
        // ---------------------
        Schema::create('bots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('token')->unique();
            $table->jsonb('config')->nullable(); // تنظیمات پاسخ‌گویی، دستورات و غیره
            $table->boolean('is_active')->default(true);
            $table->jsonb('permissions')->nullable();
            $table->foreignId('chat_id')->nullable()->constrained('chats')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Drop in reverse dependency order
        Schema::dropIfExists('bots');
        Schema::dropIfExists('stories');
        Schema::dropIfExists('call_participants');
        Schema::dropIfExists('calls');
        Schema::dropIfExists('global_settings');
        Schema::dropIfExists('user_devices');
        Schema::dropIfExists('chat_preferences');
        Schema::dropIfExists('user_settings');
        Schema::dropIfExists('pinned_messages');
        Schema::dropIfExists('message_reactions');
        Schema::dropIfExists('reaction_types');
        Schema::dropIfExists('message_scheduling');
        Schema::dropIfExists('message_statuses');
        Schema::dropIfExists('message_attachments');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('chat_user');
        Schema::dropIfExists('chats');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('users');
    }
};
