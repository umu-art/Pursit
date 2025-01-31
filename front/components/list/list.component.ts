import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SitterCardComponent} from '../sitter-card/sitter-card.component';
import {NgClass, NgForOf} from '@angular/common';
import {ApmService} from '../../services/apm.service';
import {shuffleArray} from '../../src/utils';
import {ListFlyButtonComponent} from '../list-fly-button/list-fly-button.component';
import {SitterDto, SittersService, SitterType} from '../../api-core-ts';

export class SitterSelect {
  sitter: SitterDto = {};
  selected: boolean = false;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SitterCardComponent,
    NgForOf,
    NgClass,
    ListFlyButtonComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  sitters: SitterSelect[];
  type: SitterType;

  constructor(
    private sittersService: SittersService,
    private apmService: ApmService,
    private router: Router) {

    const url: string = this.router.routerState.snapshot.url;
    const params = new URLSearchParams(new URL(url, "https://some.ru/").search);
    this.type = params.get('type')! as SitterType;
    this.sitters = [];
    this.updateList()
  }

  updateList() {
    this.sittersService.getSitters()
      .subscribe((resp) => {
        this.sitters =
          shuffleArray(
            resp.filter(s => s.type === this.type)
              .map(s => {
                return {
                  sitter: s
                } as SitterSelect
              })
          )
      });
  }

  petSitting() {
    this.apmService.logGoto('opened pet-sitting', '');
    this.type = 'pet-sitting';
    this.updateList();
  }

  moralPetSitting() {
    this.apmService.logGoto('opened moral-pet-sitting', '');
    this.router.navigate(['/moral-pet-sitting'])
      .catch(err => console.error(err));
  }

  petMoving() {
    this.apmService.logGoto('opened pet-moving', '');
    this.type = 'pet-moving';
    this.updateList();
  }

  petHealth() {
    this.apmService.logGoto('opened pet-health', '');
    this.type = 'pet-health';
    this.updateList();
  }

  home() {
    this.router.navigate(['/home'])
      .catch(err => console.error(err));
  }
}
