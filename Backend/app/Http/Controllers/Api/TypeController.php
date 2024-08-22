<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $type = Type::all();
        return response()->json([
            'status' => true,
            'data' => $type,
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' =>'required|string|max:255',
            'description' =>'string',
        ]);
        $type = Type::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);
        return response()->json([
            'status' => true,
            'data' => $type,
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Type $type)
    {
        return response()->json([
            'status' => true,
            'data' => $type,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Type $type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $type = Type::find($id);

        $type->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'type updated successfully',
            'post' => $type,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $type = Type::find($id);
        if(!$type){
            return response()->json([
                'status' => false,
                'message' => 'type not found',
            ]);
        }
        $type->delete();
        return response()->json([
            'status' => true,
            'message' => 'type deleted successfully',
            'data' => $type,
        ]);
    }
}
