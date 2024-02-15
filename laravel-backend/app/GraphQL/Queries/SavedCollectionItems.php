<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Collection;

final class SavedCollectionItems
{
    /**
     * Resolve the saved items for a specific collection.
     *
     * @param null $_
     * @param array $args
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function resolve($root, array $args)
    {
        // Retrieve the collection by ID
        $collection = Collection::findOrFail($args['id']);

        // Access the saved items through the relationship
        return $collection->savedItems;
    }
}