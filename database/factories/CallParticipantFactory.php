<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CallParticipantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'call_id' => null,
            'user_id' => null,
            'status' => $this->faker->randomElement(['joined', 'left']),
        ];
    }
}
