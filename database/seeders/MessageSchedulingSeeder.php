<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MessageScheduling;
use App\Models\User;
use App\Models\Chat;

class MessageSchedulingSeeder extends Seeder
{
    public function run(): void
    {
        // اگر داده وجود ندارد چند تا کاربر و چت بسازیم
        $users = User::count() ? User::all() : User::factory(5)->create();
        $chats = Chat::count() ? Chat::all() : Chat::factory(3)->create();

        // ایجاد پیام‌های زمان‌بندی‌شده برای کاربران تصادفی
        foreach ($users->random(min(5, $users->count())) as $user) {
            MessageScheduling::factory()->count(rand(2, 5))->create([
                'user_id' => $user->id,
                'chat_id' => $chats->random()->id,
            ]);
        }

        // نمونه خاص برای تست ارسال خودکار
        MessageScheduling::factory()->create([
            'user_id' => $users->first()->id,
            'chat_id' => $chats->first()->id,
            'content' => 'یادآوری جلسه ساعت ۹ صبح ☕️',
            'type' => 'text',
            'schedule_for' => now()->addMinutes(30),
            'is_sent' => false,
        ]);
    }
}
