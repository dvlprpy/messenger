<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MessageAttachmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'message_id' => null,
            'type' => $this->faker->randomElement(['image', 'video', 'file', 'voice']),
            'url' => $this->faker->filePath(),
            'metadata' => [
                'size' => $this->faker->numberBetween(1000, 5000000),
                'mime' => $this->faker->mimeType(),
            ],
        ];
    }
}