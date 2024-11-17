import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {UserService} from '../../pursit-api-ts';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() login: EventEmitter<void> = new EventEmitter();
  @Output() register: EventEmitter<void> = new EventEmitter();

  username: string | undefined = undefined;

  constructor(userService: UserService) {
    userService.getSelf().subscribe({
      next: user => this.username = user.username,
      error: () => this.username = undefined
    });
  }

  logout() {
    document.cookie = 'mur=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  }

}
