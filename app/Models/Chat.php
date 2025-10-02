<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

class Chat extends Model
{
    use HasFactory;
    protected $table = 'chats';
    protected $primaryKey = 'id';

    protected $fillable = [
        'type',
        'title',
        'settings',
    ];

    protected $casts = [
        'settings' => 'array',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'chat_user')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'chat_id');
    }

    public function lastMessage()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    public function lastMessagePerUser()
    {
        return $this->hasMany(Message::class)
            ->select('messages.*')
            ->join(
                DB::raw('(SELECT MAX(id) as id FROM messages GROUP BY sender_id, chat_id) as last_messages'),
                'messages.id',
                '=',
                'last_messages.id'
            );
    }


}
