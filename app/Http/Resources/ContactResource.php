<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'contact_id' => $this->contact_user_id,
            'contact_joined_date' => $this->updated_at,
            'contact_user_info' => new UserAuthResource($this->whenLoaded('contactUser')),
        ];
    }
}
