<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Models\LikeItineraries;
use App\Models\Itinerary;

class LikeItinerary
{
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = auth('sanctum')->user();
        $userId = $user->id;
        $itineraryId = $args['itineraryId'];

        $existingLike = LikeItineraries::where('user_id', $userId)
                                        ->where('itinerary_id', $itineraryId)
                                        ->first();

        if ($existingLike) {
            $existingLike->delete();
            $likeCount = LikeItineraries::where('itinerary_id', $itineraryId)->count();
            Itinerary::where('id', $itineraryId)->update(['likes' => $likeCount]);
            return [
                'message' => 'Itinerary unliked',
                'likes' => $likeCount
            ];
        } else {
            LikeItineraries::create([
                'user_id' => $userId,
                'itinerary_id' => $itineraryId,
            ]);
            $likeCount = LikeItineraries::where('itinerary_id', $itineraryId)->count();
            Itinerary::where('id', $itineraryId)->update(['likes' => $likeCount]);
            return [
                'message' => 'Itinerary liked',
                'likes' => $likeCount
            ];
        }
    }
}
