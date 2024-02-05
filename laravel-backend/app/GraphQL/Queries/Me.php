<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

final readonly class Me
{
    /** @param  array{}  $args */
    public function __invoke($_, array $args)
    {
        $user = auth('sanctum')->user();
    
        return $user;
    }
}
