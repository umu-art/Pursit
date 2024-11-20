import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApmService} from '../../lib/apm.service';
import {NgForOf, NgIf} from '@angular/common';
import {SitterDto} from '../../pursit-api-ts';
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
  @Output() selectEvent: EventEmitter<boolean> = new EventEmitter();

  opened: boolean = false;
  selected: boolean = false;

  constructor(private apmService: ApmService) {
  }

  request() {
    this.selected = !this.selected;
    this.selectEvent.emit(this.selected);
  }

  showMore() {
    this.apmService.logGoto('opened sitter ' + this.sitter.name + ' card', '');
    this.opened = !this.opened;
  }

  protected readonly parseTakes = parseTakes;
}
