import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SitterCardComponent} from '../sitter-card/sitter-card.component';
import {NgClass, NgForOf} from '@angular/common';
import {ApmService} from '../../lib/apm.service';
import {SitterDto, SittersService, SitterType} from '../../pursit-api-ts';
import {shuffleArray} from '../../src/utils';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SitterCardComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  sitters: SitterDto[];
  category: string | null;

  constructor(
    private sittersService: SittersService,
    private apmService: ApmService,
    private router: Router) {

    const url: string = this.router.routerState.snapshot.url;
    const params = new URLSearchParams(new URL(url, "https://some.ru/").search);
    this.category = params.get('category');
    this.sitters = [];
    this.updateList()
  }

  updateList() {
    this.sittersService.getSitters()
      .subscribe((resp) => {
        this.sitters =
          shuffleArray(
            resp.filter(s => {
              switch (this.category) {
                case 'pet-sitting':
                  return s.type == SitterType.PetSitting;
                case 'pet-moving':
                  return s.type == SitterType.PetMoving;
                case 'pet-health':
                  return s.type == SitterType.PetHealth;
                default:
                  return false;
              }
            })
          )
      });
  }

  petSitting() {
    this.apmService.logGoto('opened pet-sitting', '');
    this.category = 'pet-sitting';
    this.updateList();
  }

  moralPetSitting() {
    this.apmService.logGoto('opened moral-pet-sitting', '');
    this.router.navigate(['/moral-pet-sitting'])
      .catch(err => console.error(err));
  }

  petMoving() {
    this.apmService.logGoto('opened pet-moving', '');
    this.category = 'pet-moving';
    this.updateList();
  }

  petHealth() {
    this.apmService.logGoto('opened pet-health', '');
    this.category = 'pet-health';
    this.updateList();
  }

  home() {
    this.router.navigate(['/home'])
      .catch(err => console.error(err));
  }

}
