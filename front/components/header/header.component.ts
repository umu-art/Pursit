import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {PopupContainerComponent} from '../popup-container/popup-container.component';
import {UserHolder} from '../../services/user-holder.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [PopupContainerComponent, UserHolder],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    protected popup: PopupContainerComponent,
    protected userHolder: UserHolder) {
  }
}
