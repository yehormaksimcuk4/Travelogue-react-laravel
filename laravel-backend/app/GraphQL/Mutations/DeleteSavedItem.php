<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;


use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Models\SavedItem;

final readonly class DeleteSavedItem
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $savedItem = SavedItem::findOrFail($args['id']);

        if ($savedItem) {
            $savedItem->delete();

            return [
                'success' => true,
                'message' => 'Item from collection deleted successfully.',
            ];
        }

        return [
            'success' => false,
            'message' => 'Item not found.',
        ];
    }
}
