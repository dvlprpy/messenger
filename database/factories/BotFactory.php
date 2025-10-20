<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Chat;

class BotFactory extends Factory
{
    public function definition(): array
    {
        // نمونه داده‌های تصادفی برای قابلیت‌های مختلف بات
        $commands = [
            ['command' => '/start', 'description' => 'شروع گفتگو با بات'],
            ['command' => '/help', 'description' => 'نمایش دستورات قابل استفاده'],
            ['command' => '/about', 'description' => 'درباره‌ی این بات'],
        ];

        $autoReplies = [
            'سلام' => 'سلام! خوش اومدی 👋',
            'کمک' => 'می‌خوای چطور کمکت کنم؟',
            'خداحافظ' => 'فعلاً! 🌙',
        ];

        return [
            'owner_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'name' => $this->faker->unique()->word() . 'Bot',
            'token' => Str::uuid()->toString(),
            'config' => [
                'commands' => $commands,
                'auto_replies' => $autoReplies,
                'greeting' => 'سلام! من یه بات آزمایشی هستم 🤖',
            ],
            'is_active' => $this->faker->boolean(90),
            'permissions' => [
                'can_read_messages' => true,
                'can_send_messages' => true,
                'can_delete_messages' => false,
                'only_in_groups' => $this->faker->boolean(40),
            ],
            'chat_id' => Chat::inRandomOrder()->first()?->id,
        ];
    }
}
