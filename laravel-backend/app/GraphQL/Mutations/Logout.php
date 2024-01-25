<?php 
// app/GraphQL/Mutations/Logout.php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class Logout
{
    public function __invoke()
    {
        Auth::logout();

        return true; // Or any response you want after successful logout
    }
}
