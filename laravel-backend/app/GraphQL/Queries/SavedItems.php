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
        return SavedItem::all(); // Adjust this according to your logic to fetch saved items
    }
}
