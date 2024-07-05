import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  isLoading: number;
  events: Event[] = [];
  private getEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.isLoading = 0;
    });
  }
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {
    this.isLoading = 0
  }
  ngOnInit(): void {
    this.getEvents();
  }

}
