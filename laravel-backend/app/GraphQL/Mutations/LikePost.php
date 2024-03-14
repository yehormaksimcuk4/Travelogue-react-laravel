<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Models\LikePosts;
use App\Models\Post;

class LikePost
{
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = auth('sanctum')->user();
        $userId = $user->id;
        $postId = $args['postId'];

        $existingLike = LikePosts::where('user_id', $userId)
                                  ->where('post_id', $postId)
                                  ->first();

        if ($existingLike) {
            // Unlike if the user has already liked the post
            $existingLike->delete();
            $likeCount = LikePosts::where('post_id', $postId)->count();
            Post::where('id', $postId)->update(['likes' => $likeCount]);
            return [
                'message' => 'Post unliked',
                'likes' => $likeCount
            ];
        } else {
            // Like if the user hasn't liked the post yet
            LikePosts::create([
                'user_id' => $userId,
                'post_id' => $postId,
            ]);
            $likeCount = LikePosts::where('post_id', $postId)->count();
            Post::where('id', $postId)->update(['likes' => $likeCount]);
            return [
                'message' => 'Post liked',
                'likes' => $likeCount
            ];
        }
    }
}
