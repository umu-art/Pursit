import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {BottomComponent} from '../../components/bottom/bottom.component';
import {NgIf} from '@angular/common';
import {LoginComponent} from '../../popup-conponents/login/login.component';
import {RegisterComponent} from '../../popup-conponents/register/register.component';
import {HelpWComponent} from '../../popup-conponents/help-w/help-w.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BottomComponent, NgIf, LoginComponent, RegisterComponent, HelpWComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loginShow: boolean = false;
  registerShow: boolean = false;
  helpShow: boolean = false;

  login() {
    this.bodyFormShowPrepare();
    this.loginShow = true;
  }

  register() {
    this.bodyFormShowPrepare();
    this.registerShow = true;
  }

  help() {
    this.bodyFormShowPrepare();
    this.helpShow = true;
  }

  bodyFormShowPrepare() {
    document.body.classList.add('stop-scrolling');

    const hider = document.getElementById('hider')!;
    hider.style.display = 'block';
    setTimeout(() => {
      hider.style.opacity = '1';
    }, 1);
  }

  close() {
    document.body.classList.remove('stop-scrolling');

    const hider = document.getElementById('hider')!;
    hider.style.opacity = '0';
    setTimeout(() => {
      hider.style.display = 'none';
    }, 490);

    const forms = document.getElementsByClassName('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].classList.remove('form-income');
      forms[i].classList.add('form-outcome');
    }

    setTimeout(() => {
      this.loginShow = false;
      this.registerShow = false;
      this.helpShow = false;
    }, 490);
  }

  closeOut(event: MouseEvent) {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.close();
  }
}
