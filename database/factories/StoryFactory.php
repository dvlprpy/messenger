<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => null,
            'media_url' => $this->faker->imageUrl(),
            'type' => $this->faker->randomElement(['image', 'video']),
            'caption' => $this->faker->sentence(),
            'created_at' => now(),
            'expires_at' => now()->addDay(),
        ];
    }
}