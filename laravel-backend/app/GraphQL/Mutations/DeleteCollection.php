<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Models\Collection;
use Exception;

final readonly class DeleteCollection
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     *
     * @return array<string, mixed>
     */
    public function __invoke(null $_, array $args): array
    {
        try {
            $collection = Collection::find($args['id']);

            if (!$collection) {
                throw new Exception('Collection not found');
            }

            // Delete the collection and its saved items
            $collection->savedItems()->delete();
            $collection->delete();

            return [
                'success' => true,
                'message' => 'Collection deleted successfully',
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'message' => $exception->getMessage(),
            ];
        }
    }
}
