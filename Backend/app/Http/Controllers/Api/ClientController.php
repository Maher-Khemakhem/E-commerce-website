<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ClientController extends Controller
{

    public function index()
    {
        $client = Client::all();

        return response()->json([
            'status' => true,
            'data' => $client,
        ], 200);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom_prenom' => 'required|string|max:20',
            'image' => 'image|mimes:jpeg,png,jpg,svg', // Ensure 'image' is required and a file
            'email' => 'required|string|max:20', // Validate existence in categories table
            'phone' => 'string|max:15', // Validate existence in types table
        ]);
        if ($request->hasFile('image')) {
            // Generate unique image name using Carbon
            $imageName = Carbon::now()->format('YmdHis') . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationPath = public_path('/clients');

            // Move the uploaded file to the destination path with the new filename
            $request->file('image')->move($destinationPath, $imageName);

            // Create the Article record with the image filename
            $client = Client::create([
                'nom_prenom' => $validatedData['nom_prenom'],
                'image' => $imageName,
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
            ]);

            // Return a JSON response indicating success
            return response()->json([
                'status' => true,
                'message' => 'Client created successfully.',
                'data' => $client,
            ], 201);
        } else {
            // Handle case where 'image' file was not uploaded
            return response()->json([
                'status' => false,
                'message' => 'No image file uploaded.',
            ], 400);
        }
    }


    public function show(Client $client)
    {
        //
    }


    public function edit(Client $client)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'status' => false,
                'message' => 'Client not found',
            ], 404);
        }

        // Validate the incoming request data
        $validatedData = $request->validate([
            'nom_prenom' => 'required|string|max:20',
            'image' => 'image|mimes:jpeg,png,jpg,svg', // Ensure 'image' is required and a file
            'email' => 'required|string|max:20', // Validate existence in categories table
            'phone' => 'string|max:15',
        ]);

        // Update name, description, categorie_id, and type_id
        $client->nom_prenom = $validatedData['nom_prenom'];
        $client->email = $validatedData['email'];
        $client->phone = $validatedData['phone'];

        // Check if there's a new image uploaded
        if ($request->hasFile('image')) {
            // Delete the old image file if it exists

            $oldImage = $client->image;
            $destinationPath = public_path('/clients');
            if ($oldImage && File::exists(public_path($destinationPath . $oldImage))) {
                File::delete(public_path($destinationPath . $oldImage));
            }

            // Generate a unique image name using Carbon
            $imageName = Carbon::now()->format('YmdHis') . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationPath = public_path('/clients');


            // Move the uploaded file to the destination path with the new filename
            $request->file('image')->move($destinationPath, $imageName);

            // Update the 'image' field in the database
            $client->image = $imageName;
        }

        // Save the updated article
        $client->save();

        // Return a JSON response indicating success
        return response()->json([
            'status' => true,
            'message' => 'Client updated successfully',
            'article' => $client,
        ], 200);
    }


    public function destroy($id)
    {
        // Find the article by its ID
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'status' => false,
                'message' => 'Client not found',
            ], 404);
        }

        // Delete the article's image from storage if it exists
        $oldImage = $client->image;
        $imagePath = public_path('clients/' . $oldImage);
        if ($oldImage && File::exists($imagePath)) {
            File::delete($imagePath);
        }

        // Delete the article from the database
        $client->delete();

        // Return a JSON response indicating success
        return response()->json([
            'status' => true,
            'message' => 'Client deleted successfully',
        ], 200);
    }


}
