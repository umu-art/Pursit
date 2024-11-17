import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

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

  register() {
    this.finish.emit();
  }
}
