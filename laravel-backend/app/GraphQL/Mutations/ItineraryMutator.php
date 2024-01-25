<?php 
// app/GraphQL/Mutations/ItineraryMutator.php

namespace App\GraphQL\Mutations;

use App\Models\Itinerary;

class ItineraryMutator
{
    public function create($root, array $args)
    {
        return Itinerary::create($args);
    }
}
