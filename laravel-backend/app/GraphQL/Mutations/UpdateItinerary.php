<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use App\Models\Itinerary;

class UpdateItinerary
{
    public function __invoke($_, array $args)
    {
        $itinerary = Itinerary::find($args['id']);
        $itinerary->update($args);
        return $itinerary;
    }
}
