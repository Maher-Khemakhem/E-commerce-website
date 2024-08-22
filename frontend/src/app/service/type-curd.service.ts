import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeCurdService {
  API:string='http://127.0.0.1:8000/api/types'
  httpHeaders = new HttpHeaders();
  constructor(private httpClient:HttpClient) { }

  checkTypeIdExists(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API}/${id}`);
  
  }
}
