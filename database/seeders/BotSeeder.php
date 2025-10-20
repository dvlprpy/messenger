<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bot;
use App\Models\User;
use App\Models\Chat;

class BotSeeder extends Seeder
{
    public function run(): void
    {
        // اگر هنوز یوزر یا چت وجود ندارد، چند تا بسازیم
        $users = User::count() ? User::all() : User::factory(5)->create();
        $chats = Chat::count() ? Chat::all() : Chat::factory(3)->create();

        // ایجاد چند بات عمومی
        Bot::factory()->count(5)->create();

        // ایجاد چند بات اختصاصی برای بعضی کاربران
        foreach ($users->random(min(5, $users->count())) as $user) {
            Bot::factory()->create([
                'owner_id' => $user->id,
                'chat_id' => $chats->random()->id ?? null,
                'config' => [
                    'commands' => [
                        ['command' => '/start', 'description' => 'شروع تعامل'],
                        ['command' => '/weather', 'description' => 'نمایش وضعیت آب‌وهوا ☀️'],
                        ['command' => '/quote', 'description' => 'نمایش نقل‌قول تصادفی ✨'],
                    ],
                    'auto_replies' => [
                        'سلام' => 'سلام دوست من 👋',
                        'آب و هوا' => 'هوا امروز عالیه ☀️',
                    ],
                    'greeting' => "سلام! من بات {$user->fullname} هستم 🤖",
                ],
            ]);
        }

        // بات مخصوص گروه‌ها (مثلاً دستیار گروه)
        Bot::factory()->create([
            'name' => 'GroupAssistantBot',
            'permissions' => [
                'can_read_messages' => true,
                'can_send_messages' => true,
                'can_delete_messages' => true,
                'only_in_groups' => true,
            ],
            'config' => [
                'commands' => [
                    ['command' => '/rules', 'description' => 'نمایش قوانین گروه 📜'],
                    ['command' => '/admin', 'description' => 'فهرست مدیران 👑'],
                ],
                'auto_replies' => [
                    'قانون' => 'قوانین گروه را رعایت کنید لطفاً 🙏',
                    'سلام' => 'سلام اعضای گروه! 👋',
                ],
                'greeting' => 'سلام من دستیار گروه هستم، برای مدیریت بهتر چت‌ها 📢',
            ],
        ]);
    }
}
