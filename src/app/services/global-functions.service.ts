import { ComponentFactoryResolver, Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import Swal from 'sweetalert2';
import { SeatPickerModalComponent } from '../components/seat-picker-modal/seat-picker-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventService } from './event.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {
  isLoading: number;
  events: Event[] = [];
  error: any;
  apiUrl: string;
  uuid: any;
  seats: any = [];
  event_id?: number = 0;
  animationEnabled: boolean;
  seatPickerContainer: any;
  timeOut: any;
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver, private http: HttpClient) {
    this.isLoading = 1;
    this.uuid = sessionStorage.getItem('uuid');
    this.apiUrl = `http://127.0.0.1:8000/api/EventSeat/getEventSeatsStatusByEventId/`;
    this.animationEnabled = false;

  }

  seatPicker(id: any, seatPickerContainer: any) {
    this.uuid = sessionStorage.getItem('uuid');
    if (this.timeOut !== null) {
           clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(() => this.seatPicker(id, seatPickerContainer), 10000);
    let factory = this.resolver.resolveComponentFactory(SeatPickerModalComponent);
  
    const componenteRef = seatPickerContainer.createComponent(factory);
    this.http.get<any[]>(this.apiUrl + `${id}/${this.uuid}/0`).subscribe(data => {
      this.seats = data;
      Swal.fire({
        width: '75%',
        html: '<div id="modalContent"></div>',
        animation: this.animationEnabled,
        showCloseButton: true,
        showConfirmButton: false,
     
        willOpen: () => {
          const factory = this.resolver.resolveComponentFactory(SeatPickerModalComponent);
          const componentRef = seatPickerContainer.createComponent(factory);
          componentRef.instance.seats = data;
          componentRef.instance.event_id = id;
          componentRef.instance.seatPickerContainer = seatPickerContainer;
          document.getElementById('modalContent')?.appendChild(componentRef.location.nativeElement);
        },
        willClose: () => { clearTimeout(this.timeOut) },
        focusConfirm: false,
        preConfirm: () => {
          // Accions a realitzar quan es confirma
        }
      });
    });
  };
}
