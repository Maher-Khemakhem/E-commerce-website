<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commandes extends Model
{
    use HasFactory;
    protected $fillable = [
        'client_id',
        'cart_items',
        'card_type',
        'card_name',
        'card_number',
        'total_price',
        'delivered'
    ];

    protected $casts = [
        'cart_items' => 'array', // Automatically cast JSON to array
    ];
}
