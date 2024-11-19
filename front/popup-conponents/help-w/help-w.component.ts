import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HelpService} from '../../pursit-api-ts';
import {PopupContainerComponent} from '../../components/popup-container/popup-container.component';
import {ErrorMessagerComponent} from '../../components/error-messager/error-messager.component';

@Component({
  selector: 'app-help-w',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ErrorMessagerComponent],
  templateUrl: './help-w.component.html',
  styleUrl: './help-w.component.css'
})
export class HelpWComponent {
  text: string = '';
  phone: string = '';
  tg: string = '';
  whatsapp: string = '';

  constructor(
    protected popup: PopupContainerComponent,
    private errorMessager: ErrorMessagerComponent,
    private helpService: HelpService) {
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
        this.popup.close()
      },
      error: resp => {
        this.errorMessager.showErrorMessage(resp.error);
      }
    });
  }
}
