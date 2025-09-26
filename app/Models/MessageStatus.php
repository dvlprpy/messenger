<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Message;

class MessageStatus extends Model
{
    use HasFactory;
    protected $table = 'message_statuses';
    protected $primaryKey = 'id';

    protected $fillable = [
        'message_id',
        'user_id',
        'status',
        'updated_at',
    ];

    const UPDATED_AT = 'updated_at';
    const CREATED_AT = null;

    public function message()
    {
        return $this->belongsTo(Message::class, 'message_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
