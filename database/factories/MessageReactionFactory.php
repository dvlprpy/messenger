<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Message;
use App\Models\ReactionType;

class MessageReactionFactory extends Factory
{
    public function definition(): array
    {
        return ['message_id' => Message::inRandomOrder()->first()?->id ?? Message::factory(), 'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(), 'reaction_type_id' => ReactionType::inRandomOrder()->first()?->id ?? ReactionType::factory(), 'created_at' => now(),];
    }
}
