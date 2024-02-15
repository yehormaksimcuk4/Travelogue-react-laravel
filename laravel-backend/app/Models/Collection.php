<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function savedItems()
    {
        return $this->hasMany(SavedItem::class);
    }
    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
    
}
