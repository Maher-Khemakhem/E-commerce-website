<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ArticleController extends Controller
{
    /*
    public function getImage($filename)
    {
        Log::info('getImage called', ['filename' => $filename]);

        $path = public_path('articles/' . $filename);
        Log::info('Image path', ['path' => $path]);

        if (!file_exists($path)) {
            Log::error('File not found', ['path' => $path]);
            return response()->json(['error' => 'File not found.'], 404);
        }

        $file = file_get_contents($path);
        $type = mime_content_type($path);

        return response($file, 200)->header('Content-Type', $type);
    }
    */
    public function indd(Request $request)
    {
        $skip = $request->skip;
        $limit = $request->limit;
        $totalcount = Article::count();

        $articles = Article::skip($skip)->take($limit)->get();
        return response()->json([
            'status' => true,
            'data' => $articles,
            'totalcount' => $totalcount,
        ], 200);
    }
    public function getArticlesByCategoryAndType(Request $request)
    {
        $categorie_id = $request->input('categorie_id');
        $type_id = $request->input('type_id');
        $limit = $request->limit;
        $skip = $request->skip;


        Log::info('Received request', ['categorie_id' => $categorie_id, 'type_id' => $type_id]);
        if($categorie_id==null || $type_id==null){
            $articles = Article::skip($skip)->take($limit)->get();
            $totalcount = Article::count();
        }else{
            $query = Article::where('categorie_id', $categorie_id)
                ->where('type_id', $type_id);
            $totalcount = $query->count();
            // Apply pagination
            if ($limit) {
                $query->skip($skip)->take($limit);
            }

            // Execute the query
            $articles = $query->get();
        }


        Log::info('Found articles', ['articles' => $articles]);

        return response()->json([
            'totalcount' => $totalcount,
            'articles' => $articles
        ]);
    }
    public function index()
    {
        $articles = Article::all();
        return response()->json([
            'status' => true,
            'data' => $articles,
        ], 200);
    }

    public function show(Article $article){
        return response()->json([
            'status' => true,
            'data' => $article,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'numeric',
            'description' => 'string',
            'image' => 'image|mimes:jpeg,png,jpg,svg',
            'moyenne' => 'numeric|min:0|max:5',
            'nbratings' => 'numeric|min:0',
            'categorie_id' => 'required|integer|exists:categories,id', // Validate existence in categories table
            'type_id' => 'required|integer|exists:types,id', // Validate existence in types table
        ]);
        $articles = Article::all();
        $articles->transform(function ($article) {
            $article->image = asset('articles/' . $article->image);
            return $article;
        });
        // Handle image upload
        if ($request->hasFile('image')) {
            // Generate unique image name using Carbon
            $imageName = Carbon::now()->format('YmdHis') . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationPath = public_path('/articles');

            // Move the uploaded file to the destination path with the new filename
            $request->file('image')->move($destinationPath, $imageName);

            // Create the Article record with the image filename
            $article = Article::create([
                'title' => $validatedData['title'],
                'price' => $validatedData['price'],
                'description' => $validatedData['description'],
                'image' => $imageName,
                'moyenne' => $validatedData['moyenne'],
                'nbratings' => $validatedData['nbratings'],
                'categorie_id' => $validatedData['categorie_id'],
                'type_id' => $validatedData['type_id'],
            ]);
            Image::create([
                'name' => $imageName,
            ]);
            // Return a JSON response indicating success
            return response()->json([
                'status' => true,
                'message' => 'Article created successfully.',
                'data' => $article,
            ], 201);
        } else {
            $article = Article::create([
                'title' => $validatedData['title'],
                'price' => $validatedData['price'],
                'description' => $validatedData['description'],
                'image' => null,
                'moyenne' => $validatedData['moyenne'],
                'nbratings' => $validatedData['nbratings'],
                'categorie_id' => $validatedData['categorie_id'],
                'type_id' => $validatedData['type_id'],
            ]);

            // Return a JSON response indicating success
            return response()->json([
                'status' => true,
                'message' => 'Article created successfully.',
                'data' => $article,
            ], 201);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the article by its ID
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found',
            ], 404);
        }

        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'numeric',
            'description' => 'string',
            'image' => 'image|mimes:jpeg,png,jpg,svg',
            'moyenne' => 'numeric|min:0|max:5',
            'nbratings' => 'numeric|min:0',
            'categorie_id' => 'required|integer|exists:categories,id', // Validate existence in categories table
            'type_id' => 'required|integer|exists:types,id', // Validate existence in types table
        ]);

        // Update name, description, categorie_id, and type_id
        $article->title = $validatedData['title'];
        $article->price = $validatedData['price'];
        $article->description = $validatedData['description'];
        $article->moyenne = $validatedData['moyenne'];
        $article->nbratings = $validatedData['nbratings'];
        $article->categorie_id = $validatedData['categorie_id'];
        $article->type_id = $validatedData['type_id'];

        // Check if there's a new image uploaded
        if ($request->hasFile('image')) {
            // Delete the old image file if it exists

            $oldImage = $article->image;
            $destinationPath = public_path('/articles');
            if ($oldImage && File::exists(public_path($destinationPath . $oldImage))) {
                File::delete(public_path($destinationPath . $oldImage));
                $img = Image::find($oldImage->name);
                $img->delete();
            }

            // Generate a unique image name using Carbon
            $imageName = Carbon::now()->format('YmdHis') . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationPath = public_path('/articles');


            // Move the uploaded file to the destination path with the new filename
            $request->file('image')->move($destinationPath, $imageName);

            // Update the 'image' field in the database
            $article->image = $imageName;
            Image::create([
                'name' => $imageName,
            ]);
        }

        // Save the updated article
        $article->save();

        // Return a JSON response indicating success
        return response()->json([
            'status' => true,
            'message' => 'Article updated successfully',
            'article' => $article,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the article by its ID
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found',
            ], 404);
        }

        // Delete the article's image from storage if it exists
        $oldImage = $article->image;
        if ($oldImage) {
            $imagePath = public_path('articles/' . $oldImage);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }

            // Assuming you have an Image model and you want to delete the image record from the database
            $img = Image::where('name', $oldImage)->first();
            if ($img) {
                $img->delete();
            }
        }

        // Delete the article from the database
        $article->delete();

        // Return a JSON response indicating success
        return response()->json([
            'status' => true,
            'message' => 'Article deleted successfully',
        ], 200);
    }

}
