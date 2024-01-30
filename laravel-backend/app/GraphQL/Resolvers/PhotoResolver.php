<?php

namespace App\GraphQL\Resolvers;

use App\Models\Photo;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class PhotoResolver
{
    public function CreatePhoto($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
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

    // Function to store the uploaded image with a unique name
    private function storeImage($user_id, $image)
    {
        \Log::info('User ID: ' . $user_id);
        \Log::info('Image: ' . print_r($image, true));
    
        $filename = 'photo_' . $user_id . '_' . time() . '.' . $image->getClientOriginalExtension();
    
        // Store the image in the public folder
        $image->storeAs('public', $filename);
    
        return $filename;
    }
}
