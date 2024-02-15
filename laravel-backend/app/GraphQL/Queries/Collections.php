<?php 
// app/GraphQL/Queries/Collections.php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Collection;
use Illuminate\Support\Facades\Auth;

final class Collections
{
    /** 
     * @param  null  $root 
     * @param  array{}  $args 
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function __invoke($root, array $args)
    {
        $userId = $args['user_id'];
        
        // Fetch collections related to the specified user ID
        return Collection::where('user_id', $userId)->get();
    }
}