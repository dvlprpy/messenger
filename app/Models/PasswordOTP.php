<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordOTP extends Model
{
    protected $table = 'password_reset';
    protected $primaryKey = 'id';
    protected $fillable = ['email', 'code', 'expires_at'];
    public $timestamps = true;

    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
