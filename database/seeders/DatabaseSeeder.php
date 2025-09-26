<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserSetting;
use App\Models\Contact;
use App\Models\Chat;
use App\Models\Message;
use App\Models\MessageStatus;
use App\Models\Call;
use App\Models\CallParticipant;
use App\Models\Story;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // --- Users + UserSettings ---
        $users = User::factory(10)->create();

        $users->each(function ($user) {
            $user->settings()->create(
                \Database\Factories\UserSettingFactory::new()->definition()
            );
        });

        // --- Contacts ---
        foreach ($users as $user) {
            $contacts = $users->where('id', '!=', $user->id)
                              ->random(min(3, $users->count() - 1));
            foreach ($contacts as $contact) {
                Contact::firstOrCreate([
                    'user_id' => $user->id,
                    'contact_user_id' => $contact->id,
                ]);
            }
        }

        // --- Chats + Messages + MessageStatuses ---
        $chats = Chat::factory(5)->create();

        foreach ($chats as $chat) {
            // انتخاب کاربران چت
            $chatUsers = $users->random(rand(2, 5));
            $chat->users()->attach(
                $chatUsers->pluck('id')->toArray(),
                ['role' => 'member']
            );

            // ساخت پیام‌ها با sender_id صحیح
            foreach (range(1,10) as $i) {
                $sender = $chatUsers->random();
                $message = Message::factory()->create([
                    'chat_id' => $chat->id,
                    'sender_id' => $sender->id,
                ]);

                // ساخت MessageStatus برای همه کاربران چت
                foreach ($chatUsers as $chatUser) {
                    MessageStatus::firstOrCreate([
                        'message_id' => $message->id,
                        'user_id' => $chatUser->id,
                    ], [
                        'status' => fake()->randomElement(['sent', 'delivered', 'seen']),
                    ]);
                }
            }
        }


        // --- Calls + CallParticipants ---
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
        $users->each(function($user) {
            Story::factory(rand(1,3))->create(['user_id' => $user->id]);
        });
    }
}