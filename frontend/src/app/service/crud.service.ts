import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from './Article';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  REST_API: string = 'http://127.0.0.1:8000/api/articles';
  ind_API:string = 'http://127.0.0.1:8000/api/articles/indd';
  categorie_API:string='http://127.0.0.1:8000/api/categories';
  type_API:string='http://127.0.0.1:8000/api/types';
  filter_API:string='http://127.0.0.1:8000/api/articles/filter';
  rating_API:string='http://127.0.0.1:8000/api/rating';
  client_API:string='http://127.0.0.1:8000/api/client';
  user_API:string = 'http://127.0.0.1:8000/api/users';
  cart_API:string = 'http://127.0.0.1:8000/api/cart';
  commande_API:string='http://127.0.0.1:8000/api/commandes';
  APP:string='http://127.0.0.1:8000/api/commandes/get';
  httpHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient) {}

  getCommandess():Observable<any> {
    return this.httpClient.get(this.commande_API)
      .pipe(catchError(this.handleError));
  }
  getCommandes(data:any):Observable<any> {
    return this.httpClient.post(this.commande_API+'/getter',data,{ headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  getCommande(data:any):Observable<any> {
    return this.httpClient.post(this.APP,data,{ headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  addCommandes(data:any):Observable<any>{
    return this.httpClient.post(this.commande_API, data, { headers: this.httpHeaders })
    .pipe(catchError(this.handleError));
  }

  updateCommandes(id:any,data:any): Observable<any>{
    
      const API_URL = `${this.commande_API}/${id}?_method=PATCH`;
      //console.log(data);
      return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
        .pipe(catchError(this.handleError));
  }

  deleteCommande(id: any): Observable<any> {
    const API_URL = `${this.commande_API}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }


  getCart(data:any):Observable<any>{
    return this.httpClient.post(`http://127.0.0.1:8000/api/cart/client`, data, { headers: this.httpHeaders })
    .pipe(catchError(this.handleError));
  }
  
  addToCart(data:any):Observable<any>{
    return this.httpClient.post(`http://127.0.0.1:8000/api/cart`, data, { headers: this.httpHeaders })
    .pipe(catchError(this.handleError));
  }
  deleteFromCart(id:any){
    const API = `${this.cart_API}/${id}`;
    return this.httpClient.delete(API, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  updateCart(id:any,data:any):Observable<any>{
    const API_URL = `${this.cart_API}/${id}?_method=PATCH`;
    //console.log(data);
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  getImage(imageName: string): Observable<Blob> {
    return this.httpClient.get(`http://127.0.0.1:8000/api/images/${imageName}`, { responseType: 'blob' });
  }

  getUsers():Observable<any>{
    return this.httpClient.get(this.user_API).pipe(catchError(this.handleError));;
  }

  addRating(data:any):Observable<any>{
    return this.httpClient.post(this.rating_API, data, { headers: this.httpHeaders })
    .pipe(catchError(this.handleError));
  }
  
  updateRating(id:any,data:any):Observable<any>{
    const API_URL = `${this.rating_API}/${id}?_method=PATCH`;
    console.log(data);
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  getRating():Observable<any>{
    return this.httpClient.get(this.rating_API)
    .pipe(catchError(this.handleError));
  }

  addArticle(data:any): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.REST_API, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  getClients(): Observable<any> {
    return this.httpClient.get(this.client_API)
      .pipe(catchError(this.handleError));
  }
  getArticles(): Observable<any> {
    return this.httpClient.get(this.REST_API)
      .pipe(catchError(this.handleError));
  }
  getArtic(data:any): Observable<any> {
    return this.httpClient.post(this.ind_API,data)
      .pipe(catchError(this.handleError));
  }
  
  getArts(data:any):Observable<any>{
    return this.httpClient.post(this.filter_API,data,{ headers: this.httpHeaders });
  }

  getCategories():Observable<any>{
    return this.httpClient.get(this.categorie_API).pipe(catchError(this.handleError));
  }

  getTypes():Observable<any>{
    return this.httpClient.get(this.type_API).pipe(catchError(this.handleError));
  }

  getArticle(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => res || {}),
        catchError(this.handleError)
      );
  }

  getCategorie(id: any): Observable<any> {
    const API_URL = `${this.categorie_API}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => res || {}),
        catchError(this.handleError)
      );
  }

  getType(id: any): Observable<any> {
    const API_URL = `${this.type_API}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => res || {}),
        catchError(this.handleError)
      );
  }
  

  updateArticle(id: any, data: any): Observable<any> {
    const API_URL = `${this.REST_API}/${id}?_method=PATCH`;
    console.log(data);
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteArticle(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteRating(id:any):Observable<any>{
    const API_URL = `${this.rating_API}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
  
}
