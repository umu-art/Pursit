import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../pursit-api-ts';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() finish = new EventEmitter<void>();

  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private userService: UserService) {
  }

  register() {
    if (this.password !== this.repeatPassword) {
      return
    }

    this.userService.register({
      username: this.username,
      email: this.email,
      password: this.password,
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
