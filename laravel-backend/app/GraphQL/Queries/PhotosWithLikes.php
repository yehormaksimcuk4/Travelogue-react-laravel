<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Photo;

final readonly class PhotosWithLikes
{
    public function __invoke($rootValue, array $args)
    {
        // Fetch all photos with their likes count
        return Photo::withCount('likes')->get();
    }
}
