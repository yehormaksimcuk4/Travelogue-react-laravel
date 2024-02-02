<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

final readonly class User
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
            // Fetch user data based on the provided arguments (e.g., $args['id'])
            $userId = $args['id'] ?? null;
    
            // Add any additional logic or validation as needed
            if (!$userId) {
                // Handle the case when the user ID is not provided
                throw new \InvalidArgumentException('User ID is required');
            }
    
            // Use Eloquent to retrieve the user data
            $user = User::find($userId);
    
            // If the user is not found, you can throw an exception or return null
            if (!$user) {
                throw new \RuntimeException('User not found');
            }
    
            return $user;
        }
    }
