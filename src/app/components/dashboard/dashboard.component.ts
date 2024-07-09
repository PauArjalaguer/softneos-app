import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  events: any[] = [];
  isLoading: number;
  error: any;
  constructor(private eventService: EventService, private router: Router) {  this.isLoading=1;}
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
    },error => { this.error = error });

  }
}