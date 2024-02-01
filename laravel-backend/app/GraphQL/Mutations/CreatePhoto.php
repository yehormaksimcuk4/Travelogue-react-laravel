<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\Photo;

class CreatePhoto
{
    public function __invoke($_, array $args)
    {
        $user_id = $args['user_id'];
        $image = $args['image'];
        $image_path = $args['image_path'];  // Use the provided image_path

        // Validate and store the uploaded image
        $filename = $this->storeImage($user_id, $image);

        // Create a new photo record
        $photo = Photo::create([
            'user_id' => $user_id,
            'image_path' => $image_path,  // Use the provided image_path
        ]);

        return $photo;
    }

    private function storeImage($user_id, UploadedFile $image)
    {
        $filename = 'photo_' . $user_id . '_' . time() . '.' . $image->getClientOriginalExtension();

        // Store the image using Laravel's Storage facade
        $image->storeAs('public', $filename);

        // Get the public URL for the stored image
        $imagePath = Storage::url($filename);

        return $imagePath;
    }
}