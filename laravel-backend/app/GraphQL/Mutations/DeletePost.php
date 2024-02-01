<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Models\Post;

class DeletePost
{
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $post = Post::find($args['id']);

        if ($post) {
            $post->delete();

            return [
                'success' => true,
                'message' => 'Post deleted successfully.',
            ];
        }

        return [
            'success' => false,
            'message' => 'Post not found.',
        ];
    }
}