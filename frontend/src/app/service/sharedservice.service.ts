import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  /*
  private authSubject = new BehaviorSubject<boolean>(false);
  auth$ = this.authSubject.asObservable();

  private articlesSubject = new BehaviorSubject<any>([]);
  articles$ = this.articlesSubject.asObservable();

  private clientidSubject = new BehaviorSubject<number>(0);
  client_id$ = this.clientidSubject.asObservable();

  setClientId(id:any):void{
    this.clientidSubject.next(id);
  }

  getClientId():number{
    return this.clientidSubject.value;
  }

  setAuthStatus(authenticated: boolean): void {
    this.authSubject.next(authenticated);
  }

  getAuthStatus(): boolean {
    return this.authSubject.value;
  }

  setArticle(article: any[]): void {
    this.articlesSubject.next(article);
  }

  getArticle(): any[] {
    return this.articlesSubject.value;
  }
  */
  private authSubject = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('authStatus') || 'false'));
  auth$ = this.authSubject.asObservable();

  private clientIdSubject = new BehaviorSubject<number | null>(JSON.parse(localStorage.getItem('client_id') || 'null'));
  clientId$ = this.clientIdSubject.asObservable();

  private articlesSubject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('articles') || '[]'));
  articles$ = this.articlesSubject.asObservable();

  setAuthStatus(status: boolean) {
    localStorage.setItem('authStatus', JSON.stringify(status));
    this.authSubject.next(status);
  }

  setClientId(client_id: number) {
    localStorage.setItem('client_id', JSON.stringify(client_id));
    this.clientIdSubject.next(client_id);
  }

  setArticles(articles: any[]) {
    localStorage.setItem('articles', JSON.stringify(articles));
    this.articlesSubject.next(articles);
  }

}
