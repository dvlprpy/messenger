<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Chat;

class MessageSchedulingFactory extends Factory
{
    public function definition(): array
    {
        $type = $this->faker->randomElement(['text', 'image', 'video', 'file']);
        $attachments = null;

        if ($type !== 'text') {
            $attachments = match ($type) {
                'image' => [['url' => $this->faker->imageUrl(), 'type' => 'image', 'name' => 'photo.jpg']],
                'video' => [['url' => $this->faker->url(), 'type' => 'video', 'name' => 'clip.mp4']],
                'file' => [['url' => $this->faker->url(), 'type' => 'file', 'name' => 'document.pdf']],
                default => null,
            };
        }

        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'chat_id' => Chat::inRandomOrder()->first()?->id ?? Chat::factory(),
            'content' => $type === 'text' ? $this->faker->sentence() : null,
            'attachments' => $attachments,
            'type' => $type,
            'schedule_for' => now()->addMinutes($this->faker->numberBetween(5, 720)), // بین ۵ دقیقه تا ۱۲ ساعت بعد
            'is_sent' => false,
        ];
    }
}
