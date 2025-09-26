<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserSettingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => null, // بعداً تو Seeder مقدار می‌گیره
            'preferences' => [
                'theme' => $this->faker->randomElement(['light', 'dark']),
                'font' => $this->faker->randomElement(['iranSans', 'tahoma']),
                'language' => $this->faker->randomElement(['fa', 'en']),
            ],
        ];
    }
}