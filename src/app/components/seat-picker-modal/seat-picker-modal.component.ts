import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seat-picker-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-picker-modal.component.html',
  styleUrl: './seat-picker-modal.component.css'
})
export class SeatPickerModalComponent {
  @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();
  rand?: Number;
  seats: any;
  event_id: number;
  uuid: any;
  error?: any;
  message?: any;
  constructor(private eventService: EventService, private router: Router) {
    this.event_id = 0;
    this.uuid = sessionStorage.getItem('uuid');

  }
  ngOnInit(): void {
    this.rand = Date.now();
    setTimeout(() => this.redirectTo('inici/' + this.event_id ), 60000);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])
    });
  }
  changeSeatStatus(event_id: number, seat_id: number, status_id: number = 4) {
   
    this.eventService.updateEventSeatStatus(event_id, seat_id, this.uuid, status_id).subscribe(events => {
      //

      if (String(events) == 'error') {
        this.error = events;
        setTimeout(() => this.redirectTo('inici/' + this.event_id ), 5000);
      } else { 
        this.message = "Assignant seient";
        setTimeout(() => this.redirectTo('inici/' + this.event_id ), 1000);
       // this.redirectTo('inici/' + event_id + "/" + Date.now());
      }


    }, error => this.error = error);
  }
}

