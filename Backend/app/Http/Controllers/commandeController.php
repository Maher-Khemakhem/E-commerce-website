<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Commandes;
use Illuminate\Http\Request;

class commandeController extends Controller
{
    public function index()
    {
        $commandes = Commandes::all();
        return response()->json([
            'data'=>$commandes,
        ]);
    }

    public function getCommandes(Request $request){
        $skip = $request->skip;
        $limit = $request->limit;
        $totalcount = Commandes::count();
        $commandes = Commandes::skip($skip)->take($limit)->get();



        return response()->json([
            'status' => true,
            'data' => $commandes,
            'totalcount' => $totalcount,
        ], 200);
    }




    public function getCommande(Request $request) {
        $client_id = $request->input('client_id');
        $skip = $request->skip;
        $limit = $request->limit;

        if (!$client_id) {
            return response()->json([
                'error' => 'client_id is required'
            ], 400); // Bad Request
        }
        $totalcount = Commandes::count();
        $commandes = Commandes::where('client_id', $client_id)->skip($skip)->take($limit)->get();

        if ($commandes->isEmpty()) {
            return response()->json([
                'message' => 'No commandes found for this client'
            ], 404); // Not Found
        }

        return response()->json([
            'status' => true,
            'data' => $commandes,
            'totalcount' => $totalcount,
        ], 200); // OK
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:users,id',
            'total_price' => 'required|integer|min:1',
            'cart_items' => 'required|json',
            'card_type' => 'required|string',
            'card_name' => 'required|string',
            'card_number' => 'required|string',
            'delivered' => 'sometimes|boolean'
        ]);

        $commande = Commandes::create($request->all());
        return response()->json([
            'data' => $commande
        ], 201);
    }

    public function show($id)
    {
        $commande = Commandes::findOrFail($id);
        return response()->json([
            'data'=>$commande]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'delivered' => 'required|boolean'
        ]);

        $commande = Commandes::findOrFail($id);

        $commande->update($request->all());
        return response()->json([
            'data'=>$commande
        ]);
    }

    public function destroy($id)
    {
        $commande = Commandes::findOrFail($id);
        $commande->delete();
        return response()->json(null, 204);
    }
}
