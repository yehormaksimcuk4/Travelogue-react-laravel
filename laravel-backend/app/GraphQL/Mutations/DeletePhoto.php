<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Storage;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Models\Photo;

class DeletePhoto
{
    /**
     * Resolve the mutation.
     *
     * @param  null  $_
     * @param  array  $args
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo
     * @return mixed
     */
    public function __invoke($_, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // Logic for deleting a photo
        // Access the photo ID from $args['id']

        // Example:
        $photoId = $args['id'];
        $photo = Photo::find($photoId);

        if ($photo) {
            // Delete the file from the public folder
            $imagePath = public_path($photo->image_path);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            // Delete the photo record from the database
            $photo->delete();

            return ['success' => true, 'message' => 'Photo deleted successfully'];
        }

        return ['success' => false, 'message' => 'Photo not found'];
    }
}
