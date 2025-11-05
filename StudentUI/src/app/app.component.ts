import { Component } from '@angular/core';
import { TopNavComponent } from "./layout/top-nav/top-nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [TopNavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-admin-ui';
}
