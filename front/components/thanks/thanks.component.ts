import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.css'
})
export class ThanksComponent {

  constructor(private router: Router) {
  }

  backHome() {
    this.router.navigate(['/home'])
      .catch(err => console.error(err));
  }
}
