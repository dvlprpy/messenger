<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserAuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id'       => $this->id,
            'user_name'     => $this->fullname,   // تغییر نام ستون
            'user_username' => $this->username,
            'user_phone'    => $this->phone ? $this->phone : '09121111111',
            'user_email'    => $this->email,
            'user_avatar'   => $this->avatar ? $this->avatar : '/Icon/avatar.svg',
            'user_joined_date'   => $this->created_at, // تاریخ عضویت
        ];
    }
}
