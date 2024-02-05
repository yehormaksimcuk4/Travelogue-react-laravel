<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use App\Models\SavedItem;
use App\Models\Photo;
use App\Models\User;

final class SaveItem
{
    public function __invoke($_, array $args): SavedItem
    {
        if (!auth('sanctum')->check()) {
            throw new \Exception("User not authenticated.");
        }
    
        $user = auth('sanctum')->user();
        // Retrieve the authenticated user
        // $userId = 1;

        // Optionally, you can retrieve the user by ID if needed
        // $user = User::find($userId);
        $token = request()->bearerToken();
        info('Bearer Token:', [$token]);
        // $user = auth()->user();

        if (!$user) {
            // If not authenticated, throw an exception or handle it as needed
            throw new \Exception("User not authenticated.");
        }

        // Retrieve the Photo model by ID
        $item = Photo::find($args['itemId']);

        if (!$item) {
            // Handle the case where the Photo is not found
            throw new \Exception("Photo with ID {$args['itemId']} not found.");
        }

        // Ensure the 'user_id' property exists before accessing it
        if (!isset($item->user_id)) {
            throw new \Exception("The 'user_id' property does not exist on the Photo model.");
        }

        // Create a new SavedItem record
        $savedItem = new SavedItem([
            'author_id' => $item->user_id,  // Accessing user_id from Photo model
            'user_id' => $user->id,
            'image_path' => $item->image_path,
            // Add other fields as needed
        ]);

        $savedItem->save();

        return $savedItem;
    }
}
