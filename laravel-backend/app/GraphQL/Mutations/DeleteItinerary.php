<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Itinerary;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class DeleteItinerary
{
    public function __invoke($rootValue, array $args, GraphQLContext $context)
    {
        $itinerary = Itinerary::find($args['id']);

        if (!$itinerary) {
            return [
                'success' => false,
                'message' => 'Itinerary not found',
            ];
        }

        $itinerary->delete();

        return [
            'success' => true,
            'message' => 'Itinerary deleted successfully',
        ];
    }
}
