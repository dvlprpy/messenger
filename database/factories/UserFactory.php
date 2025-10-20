<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'fullname' => $this->faker->name(),
            'username' => $this->faker->unique()->userName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->unique()->phoneNumber(),
            'birthday' => $this->faker->dateTimeBetween('-40 years', '-18 years'),
            'password' => Hash::make('password'),
            'avatar' => $this->faker->imageUrl(200, 200, 'people'),
            'registered_at' => now(),
        ];
    }
}