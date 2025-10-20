<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ReactionType;

class ReactionTypeSeeder extends Seeder
{
    public function run(): void
    {
        $reactions = [['name' => 'like', 'emoji' => '❤️'], ['name' => 'laugh', 'emoji' => '😂'], ['name' => 'fire', 'emoji' => '🔥'], ['name' => 'thumbs_up', 'emoji' => '👍'], ['name' => 'thumbs_down', 'emoji' => '👎'], ['name' => 'cry', 'emoji' => '😢'], ['name' => 'angry', 'emoji' => '😡'],];
        foreach ($reactions as $reaction) {
            ReactionType::firstOrCreate(['name' => $reaction['name']], $reaction);
        }
    }
}
