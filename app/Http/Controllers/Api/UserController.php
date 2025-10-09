<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use \App\Http\Resources\ContactResource;
use App\Http\Resources\UserAuthResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = $request->validate([
            'birthday' => 'nullable|date'
        ]);

        $user = Auth::user();

        $user->update([
            'birthday' => $validate['birthday']
        ]);

        $userd = Auth::user();

        return new UserAuthResource($userd);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * user setting.
     */
    public function settings()
    {
        //
    }
}
