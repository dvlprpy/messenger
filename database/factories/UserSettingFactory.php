<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserSettingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'personal_info' => [
                'bio' => $this->faker->sentence(),
                'status' => $this->faker->randomElement(['online', 'offline', 'busy']),
            ],
            'notification_and_sounds' => [
                'message_sound' => true,
                'vibrate' => false,
            ],
            'privacy_and_security' => [
                'last_seen' => 'contacts',
                'read_receipts' => true,
            ],
            'chat_settings' => [
                'theme' => $this->faker->randomElement(['light', 'dark']),
                'font' => 'iransans',
            ],
            'languages' => ['fa'],
        ];
    }
}
