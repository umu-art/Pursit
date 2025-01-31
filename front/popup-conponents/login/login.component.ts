import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PopupContainerComponent} from '../../components/popup-container/popup-container.component';
import {ErrorComponent} from '../../components/error/error.component';
import {UserHolder} from '../../services/user-holder.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    protected popup: PopupContainerComponent,
    private error: ErrorComponent,
    private userHolder: UserHolder,
    protected fb: FormBuilder) {

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
    if (!this.form.valid) {
      this.error.showErrorMessage('Некорректно заполнены поля!');
      return;
    }

    this.userHolder.login(
      {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      },
      () => this.popup.close(),
      resp => this.error.showErrorMessage(resp.error)
    );
  }
}
