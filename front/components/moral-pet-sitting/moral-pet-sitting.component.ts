import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-moral-pet-sitting',
  standalone: true,
  imports: [],
  templateUrl: './moral-pet-sitting.component.html',
  styleUrl: './moral-pet-sitting.component.css'
})
export class MoralPetSittingComponent {

  constructor(private router: Router) {
  }

  backHome() {
    this.router.navigate(['/home'])
      .catch(err => console.error(err));
  }
}
