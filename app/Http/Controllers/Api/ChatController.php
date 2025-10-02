<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use Illuminate\Http\Request;
use App\Models\User;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        $chats = Chat::whereHas('users', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->with([
                'users',                         // همه اعضای چت
                'lastMessagePerUser.sender'      // آخرین پیام هر کاربر + فرستنده
            ])
            ->get();

        return ChatResource::collection($chats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
     * user add.
     */
    public function addUser()
    {
        //
    }

    /**
     * user remove.
     */
    public function removeUser()
    {
        //
    }
}
