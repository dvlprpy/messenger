<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class CallFactory extends Factory
{
    public function definition(): array
    {
        $users = User::all();

        // انتخاب دو کاربر متفاوت
        $caller = $users->random();
        $receiver = $users->where('id', '!=', $caller->id)->random();

        return [
            'caller_id' => $caller->id,
            'receiver_id' => $receiver->id,
            'call_type' => $this->faker->randomElement(['incoming', 'outgoing', 'missed']),
            'duration' => $this->faker->numberBetween(0, 3600),
            'call_time' => now(),
        ];
    }
}