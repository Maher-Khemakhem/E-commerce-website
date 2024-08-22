<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::all();
        return response()->json([
            'data' => $carts,
        ]);
    }
    public function getCart(Request $request){
        $client_id = $request->input('client_id');
        $carts = Cart::where('client_id', $client_id)->get();
        return response()->json([
            'data' => $carts->toArray(),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'image' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cart = Cart::create($request->all());
        return response()->json([
            'data' => $cart,
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        return response()->json([
            'data' => $cart,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'image' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cart->update($request->all());
        return response()->json([
            'data' => $cart,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();
        return response()->json(null, 204);
    }
}
