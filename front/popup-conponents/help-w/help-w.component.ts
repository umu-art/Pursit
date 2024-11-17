import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HelpService} from '../../pursit-api-ts';

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

  constructor(private helpService: HelpService) {
  }

  send() {
    this.helpService.sendHelp({
      message: this.text,
      phone: this.phone,
      tg: this.tg,
      whatsapp: this.whatsapp
    }).subscribe({
      next: () => {
        console.log('Успеха');
        this.finish.emit();
      },
      error: resp => {
        console.log(resp)
      }
    });
  }
}
