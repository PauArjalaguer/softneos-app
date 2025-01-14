import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sessionUUid: string = "";
  ngOnInit() {
    if (!sessionStorage.getItem('uuid')) {
      const uuid = unescape(encodeURIComponent(Date.now()));
      sessionStorage.setItem('uuid', uuid);
    }
  }
  title = 'Teatre Olesa';
}