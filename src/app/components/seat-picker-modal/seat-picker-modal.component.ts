import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GlobalFunctionsService } from '../../services/global-functions.service';

@Component({
  selector: 'app-seat-picker-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seat-picker-modal.component.html',
  styleUrl: './seat-picker-modal.component.css'
})
export class SeatPickerModalComponent {
  seats: any;
  event_id?: any;
  uuid: any;
  error?: any;
  message?: any;
  seatPickerContainer: any;
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute, private funcs: GlobalFunctionsService) {
    this.event_id;
    this.uuid = sessionStorage.getItem('uuid');
  }
  ngOnInit(): void {

  }
  changeSeatStatus(event_id: any, seat_id: number, status_id: number = 4) {
    this.eventService.updateEventSeatStatus(event_id, seat_id, this.uuid, status_id).subscribe(events => {
      if (String(events) == 'error') {
        this.error = events;
        setTimeout(() => this.funcs.seatPicker(event_id, this.seatPickerContainer), 1500);
      } else {
        this.message = "Assignant seient";
        setTimeout(() => this.funcs.seatPicker(event_id, this.seatPickerContainer), 100);
      }
    }, error => this.error = error);
  }
  save(event_id: number) {   
    if (!Number(this.route.snapshot.paramMap.get('id'))) {
      this.router.navigate(['/resum/'+event_id]);
    }else{
      window.location.reload();
    }
  }
}