import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ApmService} from '../../lib/apm.service';

@Component({
  selector: 'app-moral-pet-sitting',
  standalone: true,
  imports: [],
  templateUrl: './moral-pet-sitting.component.html',
  styleUrl: './moral-pet-sitting.component.css'
})
export class MoralPetSittingComponent {

  constructor(private router: Router,
              private apmService: ApmService) {
  }

  backHome() {
    this.router.navigate(['/home'])
      .catch(err => console.error(err));
  }

  petSitting() {
    this.apmService.logGoto('opened pet-sitting', '');
    this.router.navigate(['/list'], {queryParams: {category: 'pet-sitting'}})
      .catch(err => console.error(err));
  }
}
