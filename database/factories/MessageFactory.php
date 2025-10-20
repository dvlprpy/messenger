<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'chat_id' => null,
            'sender_id' => null,
            'content' => [
                'text' => $this->faker->sentence(),
                'file' => null,
                'image' => null
            ],
            'sent_at' => now(),
            'edited' => false,
        ];
    }
}
