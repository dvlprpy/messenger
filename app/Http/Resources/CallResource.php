<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CallResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'call_id' => $this->id,
            'call_duration' => $this->duration,
            'call_time' => $this->call_time,
            'call_type' => $this->call_type,
            'call_receiver_info' => new UserAuthResource($this->whenLoaded('receiver'))
        ];
    }
}
