<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{
    User,
    UserSetting,
    Contact,
    Chat,
    Message,
    MessageStatus,
    MessageAttachment,
    MessageReaction,
    Call,
    CallParticipant,
    Story,
    GlobalSetting
};

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // --- Users + Settings ---
        $users = User::factory(10)->create();

        $users->each(function ($user) {
            $user->settings()->create(
                \Database\Factories\UserSettingFactory::new()->definition()
            );
        });

        // --- Contacts ---
        Contact::factory(20)->create();

        // --- Chats + Messages ---
        $chats = Chat::factory(5)->create();

        foreach ($chats as $chat) {
            $chatUsers = $users->random(rand(2, 5));
            $chat->users()->attach($chatUsers->pluck('id')->toArray(), ['role' => 'member']);

            foreach (range(1, 10) as $i) {
                $sender = $chatUsers->random();
                $message = Message::factory()->create([
                    'chat_id' => $chat->id,
                    'sender_id' => $sender->id,
                ]);
                // Attachments
                if (rand(0, 1)) {
                    MessageAttachment::factory(rand(1, 2))->create([
                        'message_id' => $message->id,
                    ]);
                }

                // Reactions
                foreach ($chatUsers->random(rand(0, count($chatUsers))) as $reactor) {
                    MessageReaction::factory()->create([
                        'message_id' => $message->id,
                        'user_id' => $reactor->id,
                    ]);
                }

                // Statuses
                foreach ($chatUsers as $chatUser) {
                    MessageStatus::updateOrCreate([
                        'message_id' => $message->id,
                        'user_id' => $chatUser->id,
                    ], [
                        'status' => fake()->randomElement(['sent', 'delivered', 'seen']),
                    ]);
                }
            }
        }

        // --- Calls + Participants ---
        $calls = Call::factory(5)->create();

        foreach ($calls as $call) {
            $participants = $users->random(rand(2, 4));
            foreach ($participants as $participant) {
                CallParticipant::firstOrCreate([
                    'call_id' => $call->id,
                    'user_id' => $participant->id,
                ], [
                    'status' => fake()->randomElement(['joined', 'left', 'missed']),
                ]);
            }
        }

        // --- Stories ---
        $users->each(fn($u) => Story::factory(rand(1, 3))->create(['user_id' => $u->id]));

        // --- Bot Setting ---
        $this->call(BotSeeder::class);


        $this->call([
            MessageSchedulingSeeder::class,
            GlobalSettingsSeeder::class,
        ]);

        $this->call([ ReactionTypeSeeder::class, MessageReactionSeeder::class, ]);
    }
}
