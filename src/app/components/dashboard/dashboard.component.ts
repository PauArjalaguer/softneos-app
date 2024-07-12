import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  events: any[] = [];
  isLoading: number;
  error: any;
  eventForm: FormGroup = new FormGroup({
    event_name: new FormControl('', [Validators.required]),
    event_image: new FormControl('', Validators.required),
    event_date: new FormControl('', Validators.required),
    event_time: new FormControl('', Validators.required),
    event_id: new FormControl(''),
    event_price:new FormControl('', [Validators.required])
  })
  constructor(private eventService: EventService, private router: Router) { this.isLoading = 1; }
  ngOnInit(): void {
    if (Number(sessionStorage.getItem('role_id')) != 1) {
      this.router.navigate(['restart']);
    }
    this.loadDataIntoTable();

  }
  private loadDataIntoTable(): void {
    this.isLoading = 1;
    this.eventService.getEvents().subscribe(event => {
      this.events = event;
      this.isLoading = 0;
    }, error => { this.error = error });
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
  createEvent() {
    this.eventService.updateEventInfo(this.eventForm.value).subscribe(event => {
      Swal.fire({
        title: event.message,
        icon: "success", willClose: () => {      
        location.reload();
        }
      });
    });
  }
}