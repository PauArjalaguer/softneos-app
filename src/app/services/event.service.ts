import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly API_URL = "http://127.0.0.1:8000/api";
  constructor(
    private http: HttpClient
  ) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/events/`)
  }

  updateEventSeatStatus(event_id: number, seat_id: number, $uuid: any, status_id: number): Observable<Event[]> {
    let data = { 'event_id': event_id, 'seat_id': seat_id, 'session_id': $uuid, 'status_id': status_id };
    return this.http.post<Event[]>(`${this.API_URL}/EventSeat/updateEventSeatStatus/`, data)
  }
  

}