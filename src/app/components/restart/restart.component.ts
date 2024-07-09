import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restart',
  standalone: true,
  imports: [],
  templateUrl: './restart.component.html',
  styleUrl: './restart.component.css'
})
export class RestartComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.refreshCurrentRoute();
    this.navigateToNewRoute();
  }

  refreshCurrentRoute() {
    this.router.navigate([this.route.snapshot.url], { replaceUrl: true });
  }

  navigateToNewRoute() {
    this.router.navigate(['']);
  }
}
