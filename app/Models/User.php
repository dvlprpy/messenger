<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Contact;
use App\Models\Chat;
use App\Models\Message;
use App\Models\Story;

class User extends Model
{
    use HasFactory;
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $fillable = [
        'fullname',
        'username',
        'email',
        'phone',
        'password',
        'avatar',
        'registered_at',
    ];

    public function contacts()
    {
        return $this->hasMany(Contact::class, 'user_id');
    }

    public function chats()
    {
        return $this->belongsToMany(Chat::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function stories()
    {
        return $this->hasMany(Story::class, 'user_id');
    }

    public function settings()
    {
        return $this->hasOne(UserSetting::class, 'user_id');
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
