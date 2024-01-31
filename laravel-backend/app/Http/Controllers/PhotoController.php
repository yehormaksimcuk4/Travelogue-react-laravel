<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Photo;

class PhotoController extends Controller
{
    public function uploadPhoto(Request $request)
    {
        $user_id = $request->input('user_id');
        $image = $request->file('image');

        // Validate and store the uploaded image
        $filename = $this->storeImage($user_id, $image);

        // Create a new photo record
        $photo = Photo::create([
            'user_id' => $user_id,
            'image_path' => $filename,
        ]);

        return response()->json(['photo' => $photo], 201);
    }

    private function storeImage($user_id, $image)
    {
        $filename = 'photo_' . $user_id . '_' . time() . '.' . $image->getClientOriginalExtension();
    
        $path = 'app/photos/' . $filename;
    
        // Store the image using Laravel's Storage facade
        $image->storeAs('public', $path);
    
        // Get the public URL for the stored image
        $imagePath = Storage::url($path);
    
        return $imagePath;
    }
}
