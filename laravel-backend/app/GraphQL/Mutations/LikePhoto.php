<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Models\Like;
use App\Models\Photo;

class LikePhoto
{
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = auth('sanctum')->user();
        $userId = $user->id;
        $photoId = $args['photoId'];

        $existingLike = Like::where('user_id', $userId)
                            ->where('item_id', $photoId)
                            ->first();

        if ($existingLike) {
            $existingLike->delete();
            $likeCount = Photo::findOrFail($photoId)->likes()->count();
            return [
                'message' => 'Photo unliked',
                'likes' => $likeCount
            ];
        } else {
            Like::create([
                'user_id' => $userId,
                'item_id' => $photoId,
            ]);
            $likeCount = Like::where('item_id', $photoId)->count();
            Photo::where('id', $photoId)->update(['likes' => $likeCount]);
            return [
                'message' => 'Photo liked',
                'likes' => $likeCount
            ];
        }
    }
}
