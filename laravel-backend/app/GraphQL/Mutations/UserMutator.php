<?php 
// app/GraphQL/Mutations/UserMutator.php
namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserMutator
{
    public function create($root, array $args)
    {
        // Ensure the 'password' field is present in $args and hash it
        if (isset($args['password'])) {
            $args['password'] = Hash::make($args['password']);
        }

        // Customize the user creation logic as needed
        $user = User::create($args);

        return $user;
    }
}