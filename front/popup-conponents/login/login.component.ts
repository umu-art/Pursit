import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../pursit-api-ts';
import {PopupContainerComponent} from '../../components/popup-container/popup-container.component';
import {ErrorMessagerComponent} from '../../components/error-messager/error-messager.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ErrorMessagerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    protected popup: PopupContainerComponent,
    private errorMessager: ErrorMessagerComponent,
    private userService: UserService,
    fb: FormBuilder) {

    this.form = fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.required
        ],
      ],
    });
  }

  login() {
    console.log(this.form);
    if (!this.form.valid) {
      this.errorMessager.showErrorMessage('Некорректно заполнены поля!');
      return;
    }

    this.userService.login({
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
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
