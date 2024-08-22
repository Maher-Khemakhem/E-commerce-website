<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'price',
        'description',
        'moyenne',
        'nbratings',
        'image',
        'categorie_id',
        'type_id',
    ];




}
