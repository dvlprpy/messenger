<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class ContactFactory extends Factory
{
    public function definition(): array
    {
        // اگر کاربران وجود داشته باشن، از بین اون‌ها انتخاب می‌کنیم
        $user = User::inRandomOrder()->first();
        $contact = User::inRandomOrder()
            ->where('id', '!=', optional($user)->id)
            ->first();

        return [
            'user_id' => $user?->id ?? User::factory(),
            'contact_user_id' => $contact?->id ?? User::factory(),
            'contact_name' => $this->faker->name(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
