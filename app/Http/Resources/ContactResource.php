<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    public function toArray($request): array
    {
        // اگر relation لود شده باشه، یک مدل User داریم؛ در غیر این صورت null
        $user = $this->whenLoaded('contactUser') ? $this->contactUser : null;

        // نام نهایی که باید نمایش داده شود:
        // ابتدا contact_name از جدول contacts، اگر نبود fallback به phone کاربر، در آخر fullname (اختیاری)
        $displayName = $this->contact_name
            ?: ($user->phone ?? $user->fullname ?? null);

        return [
            'contact_id' => $this->contact_user_id,
            'contact_joined_date' => $this->updated_at,
            'user_name' => $displayName,
            
            // اطلاعات اضافی درباره کاربر (اگر relation لود شده باشد)
            'contact_user_info' => $user ? [
                'user_avatar' => $user->avatar ?? '/Icon/avatar.svg',
            ] : null,
        ];
    }
}