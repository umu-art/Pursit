import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopupContainerComponent} from '../../components/popup-container/popup-container.component';
import {ErrorComponent} from '../../components/error/error.component';
import {HelpService} from '../../api-core-ts';

@Component({
  selector: 'app-help-w',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ErrorComponent],
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
    private errorMessager: ErrorComponent,
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
