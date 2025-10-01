<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CallResource;
use App\Models\Call;
use Illuminate\Http\Request;

class CallController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $calls = Call::with('receiver')->where('caller_id', auth()->id())->get();
        return CallResource::collection($calls);
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
     * End Call.
     */
    public function endCall()
    {
        //
    }

    /**
     * participants.
     */
    public function participants()
    {
        //
    }
}
