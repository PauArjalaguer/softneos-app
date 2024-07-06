import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { SeatPickerModalComponent } from '../seat-picker-modal/seat-picker-modal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  isLoading: number;
  events: Event[] = [];
  error: any;
  apiUrl: string;
  uuid: any;
  seats: any = [];
  event_id?: number = 0;
animationEnabled:boolean;
  @ViewChild('seatPickerContainer', { read: ViewContainerRef, static: true }) seatPickerContainer!: ViewContainerRef;
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute, private resolver: ComponentFactoryResolver, private http: HttpClient) {
    this.isLoading = 1;
    this.uuid = sessionStorage.getItem('uuid');
    this.apiUrl = `http://127.0.0.1:8000/api/EventSeat/getEventSeatsStatusByEventId/`;
    this.animationEnabled=true;
  }

  ngOnInit(): void {
    this.getEvents();
    if (Number(this.route.snapshot.paramMap.get('id'))) {
      this.seatPicker(Number(this.route.snapshot.paramMap.get('id')), Number(this.route.snapshot.paramMap.get('rand')));
      this.animationEnabled= false;
    }
  }
  private getEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.isLoading = 0;
    }, error => { this.error = error });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])
    });
  }
  seatPicker(id: any, rand: any) {
     if(id!=Number(this.route.snapshot.paramMap.get('id'))){
      this.redirectTo('inici/' + id )
     }
    let factory = this.resolver.resolveComponentFactory(SeatPickerModalComponent);
    this.seatPickerContainer.clear();
    const componenteRef = this.seatPickerContainer.createComponent(factory);
    this.http.get<any[]>(this.apiUrl + `${id}/${this.uuid}/0`).subscribe(data => {
      this.seats = data;
      Swal.fire({
       width: '75%',
      
        html: '<div id="modalContent"></div>',
        animation: this.animationEnabled,
        showCloseButton: true,
        showConfirmButton:false,
        // showCancelButton: true,
        willOpen: () => {
          const factory = this.resolver.resolveComponentFactory(SeatPickerModalComponent);
          const componentRef = this.seatPickerContainer.createComponent(factory);
          componentRef.instance.seats = data;
          componentRef.instance.event_id = id;
          document.getElementById('modalContent')?.appendChild(componentRef.location.nativeElement);
        },
        focusConfirm: false,
        preConfirm: () => {
          // Accions a realitzar quan es confirma
        }
      });
    });
  };
}
