<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ChatFactory extends Factory
{
    public function definition(): array
    {
        $type = $this->faker->randomElement(['private', 'group']);
        return [
            'type' => $type,
            'title' => $type === 'group' ? $this->faker->words(3, true) : null,
            'settings' => ['theme' => 'light'],
        ];
    }
}
