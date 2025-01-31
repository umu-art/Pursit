import {Component, Input} from '@angular/core';
import {SitterSelect} from '../list/list.component';
import {Router} from '@angular/router';
import {ApmService} from '../../services/apm.service';
import {PopupContainerComponent} from '../popup-container/popup-container.component';
import {NgIf} from '@angular/common';
import {SitterType} from '../../api-core-ts';
import {UserHolder} from '../../services/user-holder.service';

@Component({
  selector: 'app-list-fly-button',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [PopupContainerComponent, UserHolder],
  templateUrl: './list-fly-button.component.html',
  styleUrl: './list-fly-button.component.css'
})
export class ListFlyButtonComponent {
  @Input() sitters: SitterSelect[] = [];
  @Input() type: SitterType = SitterType.PetSitting;

  constructor(
    private userHolder: UserHolder,
    private apmService: ApmService,
    private popup: PopupContainerComponent,
    private router: Router) {
  }

  protected request() {
    if (!this.userHolder.isLogined()) {
      this.popup.register();
      return;
    }

    const selectedSittersIds = this.sitters
      .filter(s => s.selected)
      .map(s => s.sitter.id)
      .join(',');

    this.apmService.logGoto('opened sitter-request', '');
    this.router.navigate(['/sitter-request'], {queryParams: {type: this.type, sitters: selectedSittersIds}})
      .catch(err => console.error(err));
  }

  protected countSelected() {
    const selectedSittersIds = this.sitters
      .filter(s => s.selected)
      .map(s => s.sitter.id);

    return selectedSittersIds.length;
  }
}
