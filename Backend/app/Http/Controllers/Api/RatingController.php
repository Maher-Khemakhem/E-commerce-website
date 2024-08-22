<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;
use App\Models\Article;
class RatingController extends Controller
{
    public function index()
    {
        $ratings = Rating::all();
        return response()->json([
            'status' => true,
            'data' => $ratings,
        ]);
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
            'note' => 'required|numeric|min:0|max:5',
            'article_id' => 'required|exists:articles,id',
            'client_id' => 'required|exists:client,id',
        ]);

        $rating = Rating::create($validatedData);

        return response()->json([
            'status' => true,
            'message' => 'Rating created successfully',
            'data' => $rating,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rating $rating)
    {
        return response()->json([
            'status' => true,
            'data' => $rating,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rating = Rating::find($id);
        if (!$rating) {
            return response()->json([
                'status' => false,
                'message' => 'Rating not found',
            ], 404);
        }

        $validatedData = $request->validate([
            'note' => 'required|numeric|min:0|max:5',
            'article_id' => 'required|exists:articles,id',
            'client_id' => 'required|exists:client,id',
        ]);

        $rating->update($validatedData);

        return response()->json([
            'status' => true,
            'message' => 'Rating updated successfully',
            'data' => $rating,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $rating = Rating::find($id);
        if (!$rating) {
            return response()->json([
                'status' => false,
                'message' => 'Rating not found',
            ], 404);
        }

        $rating->delete();

        return response()->json([
            'status' => true,
            'message' => 'Rating deleted successfully',
        ]);
    }

    public function listarticle(){
        $articles = Article::all();
        $ratings = Rating::all();
        foreach ($articles as $article) {
            foreach ($ratings as $rating) {
                $somme=0;
                $nb=0;
                if ($article->id == $rating->article_id) {
                    $somme+=$rating->note;
                    $nb+=1;
                }
            }
            $moyenne = $somme/$nb;

        }
    }

}
