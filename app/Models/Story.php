<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Story extends Model
{
    use HasFactory;
    protected $table = 'stories';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'media_url',
        'type',
        'caption',
        'created_at',
        'expires_at',
    ];

    public $timestamps = false; // چون خودت created_at و expires_at رو مدیریت می‌کنی

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
