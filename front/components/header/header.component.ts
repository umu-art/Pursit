import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {UserService} from '../../pursit-api-ts';
import {PopupContainerComponent} from '../popup-container/popup-container.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [PopupContainerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | undefined = undefined;

  constructor(
    protected popup: PopupContainerComponent,
    private userService: UserService) {

    userService.getSelf().subscribe({
      next: user => this.username = user.username,
      error: () => this.username = undefined
    });

    setInterval(() => {
      userService.getSelf().subscribe({
        next: user => this.username = user.username,
        error: () => this.username = undefined
      });
    }, 2000);
  }

  logout() {
    this.userService.logout()
      .subscribe(() => window.location.reload());
  }

}
