<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\User;
use App\Models\ReactionType;
use App\Models\MessageReaction;

class MessageReactionSeeder extends Seeder
{
    public function run(): void
    {
        $messages = Message::all();
        $users = User::all();
        $reactions = ReactionType::all();
        if ($messages->isEmpty() || $users->isEmpty() || $reactions->isEmpty()) {
            return;
        }
        foreach ($messages as $message) {
            // هر پیام ۱ تا ۵ واکنش تصادفی می‌گیرد 
            $count = rand(1, 5);
            for ($i = 0; $i < $count; $i++) {
                $user = $users->random();
                $reaction = $reactions->random();
                MessageReaction::firstOrCreate(['message_id' => $message->id, 'user_id' => $user->id,], ['reaction_type_id' => $reaction->id,]);
            }
        }
    }
}
