<?php

namespace App\Observers;

use App\Models\Rating;
use App\Models\Article;
class UserObserver
{
    /**
     * Handle the Rating "created" event.
     */
    public function created(Rating $rating): void
    {
        $articles = Article::all();
        foreach ($articles as $article) {
            if($rating->article_id==$article->id){
                $total = ($article->moyenne*$article->nbratings)+$rating->note;
                $article->nbratings+=1;
                $article->moyenne = $total/($article->nbratings);
                $article->save();
            }
        }

    }

    /**
     * Handle the Rating "updated" event.
     */
    public function updated(Rating $rating): void
    {
        $oldnote = $rating->getOriginal('note');
        $articles = Article::all();
        foreach ($articles as  $article) {
            if($rating->article_id==$article->id){
                $total = ($article->moyenne*$article->nbratings)+$rating->note-$oldnote;
                $article->moyenne = $total/($article->nbratings);
                $article->save();
            }
        }
    }

    /**
     * Handle the Rating "deleted" event.
     */
    public function deleted(Rating $rating): void
    {
        $articles = Article::all();
        foreach ($articles as $article) {
            if($rating->article_id==$article->id){
                $total = ($article->moyenne*$article->nbratings)-$rating->note;
                $article->nbratings-=1;
                if($article->nbratings==0){
                    $article->moyenne =0;
                }else {
                    $article->moyenne = $total / ($article->nbratings);
                }
                $article->save();
            }
        }
    }

    /**
     * Handle the Rating "restored" event.
     */
    public function restored(Rating $rating): void
    {
        //
    }

    /**
     * Handle the Rating "force deleted" event.
     */
    public function forceDeleted(Rating $rating): void
    {
        //
    }
}
