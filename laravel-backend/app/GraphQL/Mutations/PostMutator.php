<?php 
// app/GraphQL/Mutations/CreatePhoto.php

namespace App\GraphQL\Mutations;

use App\Models\Photo;
use App\Models\Post;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CreatePhoto
{
    public function create($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return Post::create($args);
    }
}
