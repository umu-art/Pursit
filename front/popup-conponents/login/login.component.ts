import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../pursit-api-ts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() finish = new EventEmitter<void>();

  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {
  }

  login() {
    this.userService.login({
      email: this.email,
      password: this.password
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
