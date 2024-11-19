import {Component, Input} from '@angular/core';
import {ApmService} from '../../lib/apm.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {SitterDto, UserService} from '../../pursit-api-ts';
import {PopupContainerComponent} from '../popup-container/popup-container.component';
import {parseTakes} from '../../src/utils';

@Component({
  selector: 'app-sitter-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  providers: [PopupContainerComponent],
  templateUrl: './sitter-card.component.html',
  styleUrl: './sitter-card.component.css'
})
export class SitterCardComponent {
  @Input() sitter: SitterDto = {};

  opened: boolean = false;

  constructor(
    private popup: PopupContainerComponent,
    private userService: UserService,
    private router: Router,
    private apmService: ApmService) {
  }

  request() {
    this.userService.getSelf()
      .subscribe({
        next: () => {
          this.apmService.logGoto('opened pet-moving', '');
          this.router.navigate(['/sitter-request'], {queryParams: {sitter: this.sitter.id}})
            .catch(err => console.error(err));
        },
        error: () => {
          this.popup.login()
        }
      })
  }

  showMore() {
    this.apmService.logGoto('opened sitter ' + this.sitter.name + ' card', '');
    this.opened = !this.opened;
  }

  protected readonly parseTakes = parseTakes;
}
