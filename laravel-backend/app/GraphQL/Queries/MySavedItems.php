<?php

namespace App\GraphQL\Queries;

use GraphQL\Type\Definition\Type;
use Illuminate\Support\Facades\Auth;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;
use App\Models\SavedItem;



class MySavedItems
{
    public function resolve($root, $args, $context, $resolveInfo, $getSelectFields)
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            throw new \Exception("User not authenticated.");
        }

        // Fetch the saved items for the authenticated user
        $savedItems = SavedItem::with(['author', 'user'])->get();

        // Return the user and saved items
        return [
            'id' => $user->id,
            'name' => $user->name,
            'savedItems' => $savedItems,
        ];
    }
    // {
    //     return SavedItem::with(['author', 'user'])->get();
    // }
}
