<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MessageStatusFactory extends Factory
{
    public function definition(): array
    {
        return [
            'message_id' => null,
            'user_id' => null,
            'status' => $this->faker->randomElement(['sent', 'delivered', 'seen']),
            'updated_at' => now(),
        ];
    }
}