<?php
// app/GraphQL/Resolvers/PostResolver.php

namespace App\GraphQL\Resolvers;

use App\Models\Post;

class PostResolver
{
    public function find($root, array $args)
    {
        return Post::find($args['id']);
    }
}
