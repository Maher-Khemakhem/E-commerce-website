<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\TypeController;

use App\Http\Controllers\AuthAdminsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\commandeController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




/*
Route::group(['middleware' => 'cors'], function () {

});
*/

Route::middleware(['cors'])->prefix('')->group(function () {
    Route::apiResource('categories', CategorieController::class);

    Route::apiResource('types', TypeController::class);

    Route::apiResource('articles', ArticleController::class);

    Route::apiResource('client', ClientController::class);

    Route::apiResource('rating', RatingController::class);

    Route::apiResource('images', ImageController::class);

    Route::post('articles/filter', [ArticleController::class, 'getArticlesByCategoryAndType']);

    Route::post('articles/indd', [ArticleController::class, 'indd']);

    Route::apiResource('cart', CartController::class);

    Route::post('cart/client', [CartController::class, 'getCart']);

    Route::post('register', [AuthController::class, 'register']);

    Route::apiResource('commandes', CommandeController::class);

    Route::post('commandes/get', [CommandeController::class,'getCommande']);

    Route::post('login', [AuthController::class, 'login']);

    Route::post('loginAdmin', [AuthAdminsController::class, 'login']);

    Route::apiResource('users', UsersController::class);
    Route::post('commandes/getter', [CommandeController::class,'getCommandes']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('admin', [AuthAdminsController::class, 'user']);
    Route::post('admin/logout', [AuthAdminsController::class, 'logout']);
});

Route::middleware('auth:admin')->group(function () {

});





