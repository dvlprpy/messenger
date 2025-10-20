<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GlobalSettingFactory extends Factory
{
    public function definition(): array
    {
        $key = $this->faker->randomElement(['faq', 'support', 'policy', 'terms', 'about']);
        $values = match ($key) {
            'faq' => [
                ['question' => 'چطور رمز عبورم را تغییر دهم؟', 'answer' => 'به بخش تنظیمات بروید و رمز عبور جدید را وارد کنید.'],
                ['question' => 'چطور اکانتم را حذف کنم؟', 'answer' => 'از منوی امنیت گزینه حذف حساب را انتخاب کنید.'],
            ],
            'support' => [
                'email' => 'support@messenger.test',
                'phone' => '+98-912-000-0000',
                'working_hours' => 'شنبه تا چهارشنبه، ۹ تا ۵ بعدازظهر',
            ],
            'policy' => [
                'privacy' => 'ما داده‌های شما را فقط برای بهبود خدمات نگه می‌داریم.',
                'cookies' => 'این اپلیکیشن از کوکی‌ها برای عملکرد بهتر استفاده می‌کند.',
            ],
            'terms' => [
                'usage' => 'کاربران نباید از پلتفرم برای محتوای غیرقانونی استفاده کنند.',
                'liability' => 'ما مسئول از دست رفتن داده‌ها یا خطاهای فنی نیستیم.',
            ],
            'about' => [
                'version' => '1.0.0',
                'developer' => 'Messenger Team',
                'description' => 'یک پیام‌رسان متن‌باز برای ارتباطات سریع و امن.',
            ],
            default => [],
        };

        return [
            'key' => $key,
            'value' => $values,
        ];
    }
}
