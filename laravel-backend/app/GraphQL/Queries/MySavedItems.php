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
        return SavedItem::all(); // Adjust this according to your logic to fetch saved items
    }
}
