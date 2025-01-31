import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {BottomComponent} from '../../components/bottom/bottom.component';
import {LoginComponent} from '../../popup-conponents/login/login.component';
import {RegisterComponent} from '../../popup-conponents/register/register.component';
import {HelpWComponent} from '../../popup-conponents/help-w/help-w.component';
import {PopupContainerComponent} from '../../components/popup-container/popup-container.component';
import {ErrorComponent} from '../../components/error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BottomComponent,
    LoginComponent,
    RegisterComponent,
    HelpWComponent,
    PopupContainerComponent,
    ErrorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
