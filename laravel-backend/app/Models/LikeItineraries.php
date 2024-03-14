<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikeItineraries extends Model
{
    use HasFactory;
    protected $table = 'likes_itineraries';

    protected $fillable = [
        'itinerary_id',
        'user_id',
    ];

    public function itinerary()
    {
        return $this->belongsTo(Itinerary::class);
    }
}
