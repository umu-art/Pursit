import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-help-w',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './help-w.component.html',
  styleUrl: './help-w.component.css'
})
export class HelpWComponent {
  @Output() finish = new EventEmitter<void>();

  text: string = '';
  phone: string = '';
  tg: string = '';
  whatsapp: string = '';

  send() {
    this.finish.emit();
  }
}
