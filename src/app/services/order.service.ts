import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = "http://127.0.0.1:8000/api";
  constructor(
    private http: HttpClient
  ) { }
  createOrder(data:any): Observable<Order[]> {
    
    //let data = { 'event_id': event_id, 'seat_id': seat_id, 'session_id': $session_id, 'status_id': status_id };
    return this.http.post<Order[]>(`${this.API_URL}/Order/createOrder`, data)
  }
}
