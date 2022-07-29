import { Component } from '@angular/core';
import { Router, Event, Navigation } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ANGULAR-TODOLIST';

  constructor(private router: Router) {
    if(this.router.url === '/') {
      this.router.navigate(['']);
    }
  }
}
