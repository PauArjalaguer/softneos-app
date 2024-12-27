import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { Order } from '../models/order.model';
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
  getEvent(event_id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/events/${event_id}`)
  }
  updateEventSeatStatus(event_id: number, seat_id: number, $session_id: any, status_id: number): Observable<Event[]> {
    let data = { 'event_id': event_id, 'seat_id': seat_id, 'session_id': $session_id, 'status_id': status_id };
    return this.http.post<Event[]>(`${this.API_URL}/EventSeat/updateEventSeatStatus/`, data)
  }

 getEventSeatsStatusByEventId( event_id:number, session_id: string, role_id:number): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.API_URL}/EventSeat/getEventSeatsStatusByEventId/${event_id}/${session_id}/${role_id}`)
}
  getEventSeatSummaryBySession_id( event_id:number, session_id: string, role_id:number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/EventSeat/getEventSeatSummaryBySession_id/${event_id}/${session_id}/${role_id}`)
  }

  updateSeats(event_id: number, seat_id: number, session_id: string, value:number): Observable<any> {
   let  data={'seat_id':seat_id,'event_id':event_id,'session_id':session_id,'status_id':value};     
    return this.http.post<any>(`${this.API_URL}/EventSeat/updateEventSeatStatus`,data)
  }
  updateMultipleSeats(typeOfSeat: string, number: number, event_id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/EventSeat/updateMultipleSeats/${event_id}/${typeOfSeat}/${number}`)
  }

  updateEventInfo(eventInfo:object): Observable<any> {    
     return this.http.post<any>(`${this.API_URL}/Event/updateEventInfo`,eventInfo)
   }


}