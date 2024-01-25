<?php 
// app/GraphQL/Resolvers/ItineraryResolver.php

namespace App\GraphQL\Resolvers;

use App\Models\Itinerary;

class ItineraryResolver
{
    public function find($root, array $args)
    {
        return Itinerary::find($args['id']);
    }
}
