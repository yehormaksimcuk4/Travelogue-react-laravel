<?php 
// app/GraphQL/Resolvers/UserResolver.php

namespace App\GraphQL\Resolvers;

use App\Models\User;

class UserResolver
{
    public function find($root, array $args)
    {
        return User::find($args['id']);
    }

    public function paginate($root, array $args)
    {
        // Implement your logic to paginate users
    }

    public function posts($user)
    {
        return $user->posts;
    }

    public function photos($user)
    {
        return $user->photos;
    }

    public function itineraries($user)
    {
        return $user->itineraries;
    }
}
