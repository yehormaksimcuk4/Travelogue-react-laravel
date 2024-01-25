<?php 
// app/GraphQL/Mutations/PhotoMutator.php

namespace App\GraphQL\Mutations;

use App\Models\Photo;

class PhotoMutator
{
    public function create($root, array $args)
    {
        return Photo::create($args);
    }
}
