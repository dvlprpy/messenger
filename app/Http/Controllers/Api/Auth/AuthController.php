<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserAuthResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PasswordOtp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // --- Register ---
    public function register(Request $request)
    {
        $data = $request->validate([
            'fullname' => 'required|string|max:50',
            'username' => 'required|string|max:50|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'fullname' => $data['fullname'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        return response()->json(['message' => 'کاربر گرامی ثبت نام شما با موفقیت انجام شد، از تصمیم شما برای عضویت در سرویس ما سپاسگذاریم.', 'user' => new UserAuthResource($user)], 201);
    }

    // --- Login ---
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'ایمیل یا پسورد اشتباه است',
            ], 401);
        }

        // ساخت توکن
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => new UserAuthResource($user),
        ]);
    }

    // --- Logout ---
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'خروج موفق']);
    }

    // --- Forgot Password (send OTP) ---
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email',]);

        $otp = rand(100000, 999999);

        PasswordOtp::updateOrCreate(
            ['email' => $request->email],
            [
                'code' => $otp,
                'expires_at' => now()->addMinutes(5),
            ]
        );

        // ارسال ایمیل
        Mail::raw("کد تأیید شما: $otp", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('کد بازیابی رمز عبور');
        });

        return response()->json(['message' => 'کد تأیید ارسال شد']);
    }

    // --- Verify OTP ---
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|digits:6',
        ]);


        $otp = PasswordOtp::where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$otp) {
            return response()->json(['message' => 'کد نامعتبر یا منقضی شده'], 422);
        }

        return response()->json(['message' => 'کد معتبر است']);
    }

    // --- Reset Password ---
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|digits:6',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $otp = PasswordOtp::where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$otp) {
            return response()->json(['message' => 'کد نامعتبر یا منقضی شده'], 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'کاربر یافت نشد'], 404);
        }

        $user->update(['password' => $request->password]);
        $otp->delete();

        return response()->json(['message' => 'رمز عبور با موفقیت تغییر یافت']);
    }
}
