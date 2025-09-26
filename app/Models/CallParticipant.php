<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CallParticipant extends Model
{
    use HasFactory;
    protected $table = 'call_participants';
    protected $primaryKey = 'id';

    protected $fillable = [
        'call_id',
        'user_id',
        'status',
    ];

    public function call()
    {
        return $this->belongsTo(Call::class, 'call_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
