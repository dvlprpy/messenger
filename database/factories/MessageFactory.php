<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'chat_id' => null,   // بعداً Seeder مقدار می‌ده
            'sender_id' => null, // بعداً Seeder مقدار می‌ده
            'content' => ['text' => $this->faker->sentence()],
            'sent_at' => now(),
            'edited' => false,
        ];
    }
}
