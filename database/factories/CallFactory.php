<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CallFactory extends Factory
{
    public function definition(): array
    {
        return [
            'caller_id' => null,
            'receiver_id' => null,
            'call_type' => $this->faker->randomElement(['incoming', 'outgoing', 'missed']),
            'duration' => $this->faker->numberBetween(0, 3600),
            'call_time' => now(),
        ];
    }
}