import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieCrudService {
  API:string='http://127.0.0.1:8000/api/categories'
  httpHeaders = new HttpHeaders();
  constructor(private httpClient:HttpClient) { }

  addCategorie(data:any):Observable<any>{
    return this.httpClient.post(this.API, data, { headers: this.httpHeaders })
    .pipe(catchError(this.handleError));
  }

  getCategories(): Observable<any> {
    return this.httpClient.get(this.API)
      .pipe(catchError(this.handleError));
  }

  updateCategorie(id: any, data: any): Observable<any> {
    const API_URL = `${this.API}/${id}?_method=PATCH`;
    console.log(data);
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteCategorie(id: any): Observable<any> {
    const API_URL = `${this.API}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  checkCategoryIdExists(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API}/${id}`);
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
