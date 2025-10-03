<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\CallController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| اینجا تمام روت‌های API پروژه تعریف میشن.
| همه روت‌هایی که نیاز به احراز هویت دارن با middleware 'auth:sanctum' پوشش داده شدن.
|
*/

// Auth Routes

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);



// Protected Routes (نیاز به احراز هویت)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contact', [ContactController::class, 'index']);
    Route::get('/search', [ContactController::class, 'search']);
    Route::post('/contact', [ContactController::class, 'store']);
    Route::get('/call', [CallController::class, 'index']);
    Route::get('/chat', [ChatController::class, 'index']);
});