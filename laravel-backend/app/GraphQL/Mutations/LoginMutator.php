<?php
// app/GraphQL/Mutations/LoginMutator.php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class LoginMutator
{
    public function login($rootValue, array $args)
    {
        $credentials = $args;

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return [
                'token' => $token,
                'user' => $user,
            ];
        }

        return null;
    }
}
