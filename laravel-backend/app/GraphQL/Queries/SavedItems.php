<?php

namespace App\GraphQL\Queries;

use App\Models\SavedItem;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;
use Illuminate\Support\Facades\Auth;

class SavedItems
{
    public function resolve($root, $args, $context, $resolveInfo, $getSelectFields)
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            // Handle unauthenticated user, either return null or throw an exception
            return null;
        }

        return SavedItem::with(['author', 'user'])->get();
    }
    // {
    //     return SavedItem::with('author')->get();
    // }
}
