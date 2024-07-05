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

  /* getEventsByShow_id(show_id:number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/events/getEventsByShow_id/${show_id}`)
  }
  
  getEvent(show_id:number, event_id:number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/events/getEvent/${show_id}/${event_id}`)
  } */


}