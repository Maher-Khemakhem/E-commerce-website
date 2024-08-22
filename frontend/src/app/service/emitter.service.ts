import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  private articleIndexSource = new Subject<number>();
  articleIndex$ = this.articleIndexSource.asObservable();

  constructor() {}

  emitArticleIndex(articleIndex: number) {
    this.articleIndexSource.next(articleIndex);
  }
}
