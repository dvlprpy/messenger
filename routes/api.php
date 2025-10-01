<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\CallController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);


Route::middleware('auth:sanctum')->get('/contact', [UserController::class, 'contactlist']);

Route::middleware('auth:sanctum')->get('/call', [CallController::class, 'index']);

Route::middleware('auth:sanctum')->get()