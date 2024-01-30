<?php 
// app/GraphQL/Mutations/CreatePhoto.php

namespace App\GraphQL\Mutations;

use App\Models\Photo;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CreatePhoto
{
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user_id = $args['user_id'];
        $image = $args['image_path'];

        // Validate and store the uploaded image
        $filename = $this->storeImage($user_id, $image);

        // Create a new photo record
        $photo = Photo::create([
            'user_id' => $user_id,
            'image_path' => $filename,
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
