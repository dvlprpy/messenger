<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\User;
use App\Http\Resources\ContactResource;
use App\Http\Resources\StoreContactResource;

class ContactController extends Controller
{
    /**
     * Display a listing of user contacts.
     */
    public function index()
    {
        $contacts = Contact::with('contactUser:id,fullname,email,username,phone,avatar')
            ->where('user_id', auth()->id())
            ->get();
        return ContactResource::collection($contacts);
    }

    /* Search Contact */
    public function search(Request $request)
    {
        $id = $request->query('id');
        
        if (!$id) {
            return response()->json([
                'error' => 'وارد کردن شماره تماس به صورت صحیح بدون +98 الزامی می باشد.'
            ], 400);
        }

        $user = User::where('phone', $id)->first();

        if (!$user) {
            return response()->json(['error' => 'کاربر مورد نظر یافت نشد.']);
        } 

        return response()->json([
            'status' => 'success',
            'data' => true
        ]);
    }


    /* 
        Store Contact
    */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
        ]);

        $user_id = auth()->id();

        $targetUser = User::where('phone', $validated['phone'])->first();

        if (!$targetUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'کاربری با این شماره یافت نشد.'
            ], 404);
        }

        $exists = Contact::where('user_id', $user_id)->where('contact_user_id', $targetUser->id)->exists();

        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'این مخاطب قبلاً در لیست شما وجود داشت.'
            ], 409);
        }

        if ($targetUser->id === $user_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'نمی‌توانید خودتان را به عنوان مخاطب اضافه کنید.'
            ], 400);
        }


        $contact = Contact::create([
            'user_id' => $user_id,
            'contact_user_id' => $targetUser->id,
        ]);

        $contact->user = $targetUser;
        $contact->targetUserFullname = $validated['name'];
        $contact->targetUserPhone = $validated['phone'];

        return new StoreContactResource($contact);
    }
}