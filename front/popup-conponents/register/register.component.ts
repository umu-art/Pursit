import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../pursit-api-ts';
import {PopupContainerComponent} from '../../components/popup-container/popup-container.component';
import {ErrorMessagerComponent} from '../../components/error-messager/error-messager.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [ErrorMessagerComponent],
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
    private errorMessager: ErrorMessagerComponent,
    private userService: UserService) {
  }

  register() {
    if (this.password !== this.repeatPassword) {
      this.errorMessager.showErrorMessage('Пароли не совпадают!')
      return
    }

    this.userService.register({
      username: this.username,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: () => {
        console.log('Успеха');
        this.popup.close();
      },
      error: resp => {
        this.errorMessager.showErrorMessage(resp.error);
      }
    });
  }
}
