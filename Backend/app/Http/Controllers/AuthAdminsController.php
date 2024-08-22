<?php

namespace App\Http\Controllers;

use App\Models\Admins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
class AuthAdminsController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('name', 'password');

        // Find the admin by name
        $admin = Admins::where('name', $credentials['name'])->first();

        // Check if admin exists and passwords match
        if (!$admin) {
            return response()->json([
                'message' => 'Invalid name or password',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Create token for the admin
        $token = $admin->createToken('admin-token')->plainTextToken;
        $cookie = cookie('jwt', $token, 60 * 24);

        return response()->json([
            'message' => 'Login success',
            'token' => $token,
        ])->withCookie($cookie);
    }

    public function user()
    {
        return Auth::guard('sanctum')->user(); // Ensure Sanctum guard is used
    }

    public function logout(Request $request)
    {
        // Revoke the token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout success',
        ]);
    }
}
