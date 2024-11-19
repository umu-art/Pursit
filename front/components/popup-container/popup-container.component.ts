import {Component} from '@angular/core';
import {HelpWComponent} from "../../popup-conponents/help-w/help-w.component";
import {LoginComponent} from "../../popup-conponents/login/login.component";
import {NgIf} from "@angular/common";
import {RegisterComponent} from "../../popup-conponents/register/register.component";

@Component({
  selector: 'app-popup-container',
  standalone: true,
  imports: [
    NgIf,
    HelpWComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './popup-container.component.html',
  styleUrl: './popup-container.component.css'
})
export class PopupContainerComponent {
  login() {
    this.bodyFormShowPrepare();
    this.set('login', 'flex')
  }

  register() {
    this.bodyFormShowPrepare();
    this.set('register', 'flex')
  }

  help() {
    this.bodyFormShowPrepare();
    this.set('help', 'flex')
  }

  private set(componentId: string, display: string) {
    const element = document.getElementById(componentId)!;
    element.style.display = display;
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
    }, 500);

    const forms = document.getElementsByClassName('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].classList.remove('form-income');
      forms[i].classList.add('form-outcome');
    }

    setTimeout(() => {
      this.set('login', 'none')
      this.set('register', 'none')
      this.set('help', 'none')

      for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add('form-income');
        forms[i].classList.remove('form-outcome');
      }
    }, 500);
  }

  closeOut(event: MouseEvent) {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.close();
  }

}
