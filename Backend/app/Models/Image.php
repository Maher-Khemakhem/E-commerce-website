<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $table = 'images';
    protected $primaryKey = 'name';
    public $incrementing = false; // Since the primary key is not an integer
    protected $keyType = 'string';
    protected $fillable = [
        'name',
    ];
}
