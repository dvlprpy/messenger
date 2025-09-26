<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\CallParticipant;

class Call extends Model
{
    use HasFactory;
    protected $table = 'calls';
    protected $primaryKey = 'id';

    protected $fillable = [
        'caller_id',
        'receiver_id',
        'call_type',
        'duration',
        'call_time',
    ];

    public function caller()
    {
        return $this->belongsTo(User::class, 'caller_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function participants()
    {
        return $this->hasMany(CallParticipant::class, 'call_id');
    }
}
