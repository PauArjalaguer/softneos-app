import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-event-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard-event-edit.component.html',
  styleUrl: './dashboard-event-edit.component.css'
})
export class DashboardEventEditComponent {
  //  seats: Seat[] = [];
  seats: any; //crear model de seient quan es pugui 
  lockedSeats: any;
  events?: any;
  isLoading: number;
  role_id: any = 0;
  message: any = {};
  event_id = Number(this.route.snapshot.paramMap.get('event_id'));
  UUID: any = sessionStorage.getItem('uuid');

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute,) {
    this.role_id = sessionStorage.getItem('role_id');
    this.isLoading = 1;
  }
  eventForm: FormGroup = new FormGroup({
    event_name: new FormControl('', [Validators.required]),
    event_image: new FormControl('', Validators.required),
    event_date: new FormControl('', Validators.required),
    event_time: new FormControl('', Validators.required),
    event_price: new FormControl('', Validators.required),
    event_id: new FormControl('')
  })


  ngOnInit(): void {
    if (sessionStorage.getItem('role_id') != "1") {
      this.router.navigate(['restart']);
    }
    this.loadDataIntoTable();
    setInterval(() => {
      this.loadDataIntoTable()
    }, 15000);
  }

  private loadDataIntoTable(): void {
    this.isLoading = 1;
    this.UUID = sessionStorage.getItem('uuid');
    //distribució i estat dels seients
    this.eventService.getEventSeatsStatusByEventId(this.event_id, this.UUID, this.role_id).subscribe(seat => {
      this.seats = seat;
      this.isLoading = 0;
    });

    //info de l'esdeveniment
    this.eventService.getEvent(this.event_id).subscribe(event => {
      this.events = event[0];
      this.eventForm.patchValue({
        event_id: this.event_id,
        event_name: event.event_name,
        event_image: event.event_image,
        event_date: event.event_date,
        event_time: event.event_time,
        event_price: event.event_price

      });
      this.isLoading = 0;
    });

  }

  changeMultipleSeatsStatus(typeofSeat: string, col: number) {
    this.eventService.updateMultipleSeats(typeofSeat, col, this.event_id).subscribe(message => {
      this.message = message;
    });
    this.loadDataIntoTable();
  }

  changeSeatStatus(idEvent: number, idSeat: number) {
    this.eventService.updateSeats(idEvent, idSeat, this.UUID, 3).subscribe(message => {
      this.message = message;
      this.loadDataIntoTable();
    });
  }

  hasError(field: string): boolean {
    const errorsObject = this.eventForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);
    if (errors.length && (this.eventForm.get(field)?.touched || this.eventForm.get(field)?.dirty)) {
      return true
    }
    return false;
  }
  getCurrentError(field: string): string {
    const errorsObject = this.eventForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);
    if (!errors) {
      return ''
    }
    return errors[0];
  }
  updateEventInfo() {
    this.eventService.updateEventInfo(this.eventForm.value).subscribe(event => {
      Swal.fire({
        title: event.message,
        icon: "success", willClose: () => {
          this.router.navigate(['dashboard'])
        }
      });
    });
  }
}