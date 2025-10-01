<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use \App\Http\Resources\ContactResource;

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
     * Display a listing of user contacts.
     */
    public function contactlist()
    {
        $contacts = Contact::with('contactUser:id,fullname,email,username,phone,avatar')
            ->where('user_id', auth()->id())
            ->get();
        // dd($contacts);
        return ContactResource::collection($contacts);
    }

    /**
     * user setting.
     */
    public function settings()
    {
        //
    }
}
