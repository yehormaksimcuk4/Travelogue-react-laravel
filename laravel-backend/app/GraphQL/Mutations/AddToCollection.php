<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use App\Models\SavedItem;
use App\Models\Photo;

final readonly class AddToCollection
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $photo = Photo::find($args['photoId']);

        // Get the authenticated user
        $user = auth('sanctum')->user();

        // Assuming a SavedItem should be created for each photo and collection combination
        $savedItem = new SavedItem([
            'collection_id' => $args['collectionId'],
            'author_id' => $photo->user_id,
            'user_id' => $user->id,
            'image_path' => $photo->image_path,
        ]);

        $savedItem->save();

        return $savedItem;
    }
}
