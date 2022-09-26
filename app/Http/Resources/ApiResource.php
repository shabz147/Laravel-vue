<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
    public function with($request)
    {
       
        return [
            'success' => true,
            'message' => 'Operation SuccessFull!',
            'errors' => json_decode('{}'),
        ];
    }
}
