import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GlobalFunctionsService } from '../../services/global-functions.service';
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
  uuid: any;
  seats: any = [];
  event_id?: number = 0;
  animationEnabled: boolean;
  @ViewChild('seatPickerContainer', { read: ViewContainerRef, static: true }) seatPickerContainer!: ViewContainerRef;
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver, private http: HttpClient, private funcs: GlobalFunctionsService) {
    this.isLoading = 1;
    this.animationEnabled = true;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('uuid')) {
      const uuid = unescape(encodeURIComponent(Date.now()));
      sessionStorage.setItem('uuid', uuid);
    }
    this.getEvents();
    if (Number(this.route.snapshot.paramMap.get('id'))) {
      this.animationEnabled = false;
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
  seatPicker(event_id: any, seatPickerContainer: any) {
    this.funcs.seatPicker(event_id, this.seatPickerContainer);
  }
}
