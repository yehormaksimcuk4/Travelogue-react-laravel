<?php 
// app/GraphQL/Resolvers/PhotoResolver.php

namespace App\GraphQL\Resolvers;

use App\Models\Photo;

class PhotoResolver
{
    public function find($root, array $args)
    {
        return Photo::find($args['id']);
    }
}
