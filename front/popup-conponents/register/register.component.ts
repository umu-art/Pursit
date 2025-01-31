import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PopupContainerComponent} from '../../components/popup-container/popup-container.component';
import {ErrorComponent} from '../../components/error/error.component';
import {UserHolder} from '../../services/user-holder.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [ErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(
    protected popup: PopupContainerComponent,
    private error: ErrorComponent,
    private userHolder: UserHolder) {
  }

  register() {
    if (this.password !== this.repeatPassword) {
      this.error.showErrorMessage('Пароли не совпадают!')
      return
    }

    this.userHolder.register(
      {
        username: this.username,
        email: this.email,
        password: this.password,
      },
      () => window.location.reload(), // this.popup.close(),
      resp => this.error.showErrorMessage(resp.error)
    );
  }
}
