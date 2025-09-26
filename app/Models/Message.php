<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Chat;
use App\Models\User;
use App\Models\MessageStatus;

class Message extends Model
{
    use HasFactory;
    protected $table = 'messages';
    protected $primaryKey = 'id';

    protected $fillable = [
        'chat_id',
        'sender_id',
        'content',
        'sent_at',
        'edited',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function statuses()
    {
        return $this->hasMany(MessageStatus::class, 'message_id', 'id');
    }
}
