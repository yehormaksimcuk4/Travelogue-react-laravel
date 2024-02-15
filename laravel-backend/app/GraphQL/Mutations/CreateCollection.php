<?php 
// app/GraphQL/Mutations/CreateCollection.php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Collection;
use Illuminate\Support\Facades\Auth;

final class CreateCollection
{
    /** 
     * @param  null  $root 
     * @param  array{}  $args 
     * @return Collection 
     */
    public function __invoke($root, array $args): Collection
    {
        $user = auth('sanctum')->user();

        return Collection::create([
            'name' => $args['name'],
            'user_id' => $user->id,
        ]);
    }
}