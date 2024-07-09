import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API_URL = "http://127.0.0.1:8000/api";
  constructor(
    private http: HttpClient
  ) { }

  getLogin(login:object): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, login);
  }
}