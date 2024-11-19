import {Component} from '@angular/core';
import {PopupContainerComponent} from '../popup-container/popup-container.component';

@Component({
  selector: 'app-bottom',
  standalone: true,
  imports: [],
  providers: [PopupContainerComponent],
  templateUrl: './bottom.component.html',
  styleUrl: './bottom.component.css'
})
export class BottomComponent {
  constructor(protected popup: PopupContainerComponent) {
  }
}
