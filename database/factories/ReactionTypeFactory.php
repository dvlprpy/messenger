<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReactionTypeFactory extends Factory
{
    public function definition(): array
    {
        $reactions = [['name' => 'like', 'emoji' => '❤️'], ['name' => 'laugh', 'emoji' => '😂'], ['name' => 'fire', 'emoji' => '🔥'], ['name' => 'thumbs_up', 'emoji' => '👍'], ['name' => 'thumbs_down', 'emoji' => '👎'], ['name' => 'cry', 'emoji' => '😢'], ['name' => 'angry', 'emoji' => '😡'],];
        return $this->faker->randomElement($reactions);
    }
}
