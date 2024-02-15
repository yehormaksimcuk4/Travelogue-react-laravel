<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'image_path'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function photo($savedItem)
{
    return $savedItem->photo;
}
public function collection()
{
    return $this->belongsTo(Collection::class);
}
}
