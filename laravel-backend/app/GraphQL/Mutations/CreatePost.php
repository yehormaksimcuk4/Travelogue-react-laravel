<?php 
// app/GraphQL/Mutations/PostMutator.php

namespace App\GraphQL\Mutations;

use App\Models\Post;

class PostMutator
{
    public function create($root, array $args)
    {
        return Post::create($args);
    }
}
