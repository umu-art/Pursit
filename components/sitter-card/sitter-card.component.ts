import {Component, Input} from '@angular/core';
import {ApmService} from '../../lib/apm.service';

@Component({
  selector: 'app-sitter-card',
  standalone: true,
  imports: [],
  templateUrl: './sitter-card.component.html',
  styleUrl: './sitter-card.component.css'
})
export class SitterCardComponent {
  @Input() sitter: string = "";

  contactsShow: boolean = false;

  constructor(private apmService: ApmService) {
  }

  contacts() {
    this.contactsShow = true;
    this.apmService.logGoto('opened contacts', this.sitter);
  }
}
