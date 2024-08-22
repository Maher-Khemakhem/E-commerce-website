<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /*
    public function index()
    {
        $categorie = Categorie::all();
        return response()->json([
            'status' => true,
            'data' => $categorie,
        ],200);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' =>'required|string|max:255',
            'description' =>'string',
        ]);
        $categorie = Categorie::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);
        return response()->json([
            'status' => true,
            'data' => $categorie,
        ],201);
    }


    public function show(Categorie $categorie)
    {
        return response()->json([
            'status' => true,
            'data' => $categorie,
        ]);
    }


    public function edit(Categorie $categorie)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $categorie = Categorie::find($id);

        $categorie->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'categorie updated successfully',
            'post' => $categorie,
        ], 201);
    }


    public function destroy($id)
    {
        $categorie = Categorie::find($id);
        if(!$categorie){
            return response()->json([
                'status' => false,
                'message' => 'categorie not found',
            ]);
        }
        $categorie->delete();
        return response()->json([
            'status' => true,
            'message' => 'categorie deleted successfully',
            'data' => $categorie,
        ]);
    }
    */
    public function index()
    {
        $categorie = Categorie::all();
        return response()->json([
            'status' => true,
            'data' => $categorie,
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
        $categorie = Categorie::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);
        return response()->json([
            'status' => true,
            'data' => $categorie,
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $categorie = Categorie::find($id);
        if(is_null($categorie)){
            return response()->json([
                'status' => false,
            ],404);
        }
        return response()->json([
            'status' => true,
            'data' => $categorie,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $catgorie = Categorie::find($id);

        $catgorie->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'categorie updated successfully',
            'post' => $catgorie,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categorie = Categorie::find($id);
        if(!$categorie){
            return response()->json([
                'status' => false,
                'message' => 'type not found',
            ]);
        }
        $categorie->delete();
        return response()->json([
            'status' => true,
            'message' => 'categorie deleted successfully',
            'data' => $categorie,
        ]);
    }
}
