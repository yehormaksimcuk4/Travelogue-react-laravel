<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use App\Models\Post;

class UpdatePost
{
    public function __invoke($_, array $args)
    {
        $post = Post::find($args['id']);
        $post->update($args);
        return $post;
    }
}
