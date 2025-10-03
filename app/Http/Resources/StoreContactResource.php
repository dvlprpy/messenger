<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'contact_id' => $this->user->id, // شناسه کاربر اضافه شده
            'user_name' => $this->targetUserFullname ?: $this->targetUserPhone, // نام کامل کاربر
            'contact_joined_date' => $this->updated_at, // زمان آخرین تغییر روی contact
            'user_avatar' => $this->user->avatar ? $this->user->avatar : '/Icon/avatar.svg', // عکس پروفایل یا عکس پیشفرض
            'status' => 'success', // وضعیت عملیات
            'message' => 'مخاطب با موفقیت اضافه شد.', // پیام موفقیت
        ];

    }
}
