import {Component, Input} from '@angular/core';
import {ApmService} from '../../lib/apm.service';
import {NgForOf, NgIf} from '@angular/common';

export class SitterInfo {
  photoUrl: string = '';
  name: string = '';
  shortDescription: string = '';
  fullDescription: string = '';
  takeContext: string = '';
  contacts: string = '';
  photosUrls: string[] = [];
}

@Component({
  selector: 'app-sitter-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './sitter-card.component.html',
  styleUrl: './sitter-card.component.css'
})
export class SitterCardComponent {
  @Input() sitter: SitterInfo = new SitterInfo();

  contactsShow: boolean = false;
  opened: boolean = false;

  constructor(private apmService: ApmService) {
  }

  contacts() {
    this.contactsShow = true;
  }

  showMore() {
    this.apmService.logGoto('opened sitter ' + this.sitter.name + ' card', '');
    this.opened = !this.opened;
  }
}
