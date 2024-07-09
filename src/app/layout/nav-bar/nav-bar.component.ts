import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) { }
  username: any = "";
  role_id: any = "";
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.role_id = sessionStorage.getItem('role_id');
  }
  logout() {
    sessionStorage.clear();
    window.location.reload();

  }
}