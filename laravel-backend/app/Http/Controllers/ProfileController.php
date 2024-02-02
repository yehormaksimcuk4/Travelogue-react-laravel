<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    public function userProfile()
    {
        $user = Auth::user();
        $user = User::with('profile')->find($user->id);

        return response()->json(['user' => $user]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $user = User::with('profile')->find($user->id);

        $request->validate([
            'profile_pic' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Ensure the user has a profile
        if ($user->profile === null) {
            $user->profile()->create([]);
        }

        if ($request->hasFile('profile_pic')) {
            $path = $request->file('profile_pic')->store('public/profile-pics');
            $path = str_replace('public/', 'storage/', $path);

            // Update the profile picture path
            $user->profile->update([
                'profile_pic_path' => $path,
            ]);
        }

        return response()->json(['message' => 'Profile pic updated successfully']);
    }
}
