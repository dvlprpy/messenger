<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserAuthResource;
use App\Http\Resources\LastMessagePerUser;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'chat_type' => $this->type,
            'chat_title' => $this->title,
            'chat_settings' => $this->settings,
            'chat_users_profile' => $this->whenLoaded('users', function () {
                return $this->users->map(function ($user) {
                    return [
                        'user_id'   => $user->id,
                        'user_name' => $user->fullname,
                        'user_avatar' => $user->avatar ? $user->avatar : '/Icon/avatar.svg',
                        'chat_id'   => $user->pivot->chat_id, 
                    ];
                });
            }),
            'last_message' => $this->whenLoaded('lastMessagePerUser', function () {
                return $this->lastMessagePerUser->map(function ($msg) {
                    return [
                        'last_message_id' => $msg->id,
                        'sender_id'  => $msg->sender_id,
                        'unread_count' => $msg->unread ?? 10,
                        'last_message' => $msg->content['text'],
                        'last_message_time' => $msg->sent_at,
                    ];
                });
            }),
        ];
    }

}