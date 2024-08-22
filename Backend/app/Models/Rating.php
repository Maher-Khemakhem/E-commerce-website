<?php

namespace App\Models;

use App\Observers\UserObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([UserObserver::class])]
class Rating extends Model
{
    use HasFactory;
    protected $table = 'rating';
    protected $fillable = [
        'note',
        'article_id',
        'client_id',
    ];
}
