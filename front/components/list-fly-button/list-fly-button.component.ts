import {Component, Input} from '@angular/core';
import {SitterSelect} from '../list/list.component';
import {Router} from '@angular/router';
import {SitterType, UserService} from '../../pursit-api-ts';
import {ApmService} from '../../lib/apm.service';
import {PopupContainerComponent} from '../popup-container/popup-container.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-list-fly-button',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [PopupContainerComponent],
  templateUrl: './list-fly-button.component.html',
  styleUrl: './list-fly-button.component.css'
})
export class ListFlyButtonComponent {
  @Input() sitters: SitterSelect[] = [];
  @Input() type: SitterType = SitterType.PetSitting;

  constructor(
    private userService: UserService,
    private apmService: ApmService,
    private popup: PopupContainerComponent,
    private router: Router) {
  }

  request() {
    this.userService.getSelf()
      .subscribe({
        next: () => {
          const selectedSittersIds = this.sitters
            .filter(s => s.selected)
            .map(s => s.sitter.id)
            .join(',');

          this.apmService.logGoto('opened sitter-request', '');
          this.router.navigate(['/sitter-request'], {queryParams: {type: this.type, sitters: selectedSittersIds}})
            .catch(err => console.error(err));
        },
        error: () => {
          this.popup.register()
        }
      })
  }

  countSelected() {
    const selectedSittersIds = this.sitters
      .filter(s => s.selected)
      .map(s => s.sitter.id);

    return selectedSittersIds.length;
  }
}
