import {Component} from '@angular/core';

@Component({
  selector: 'app-error-messager',
  standalone: true,
  imports: [],
  templateUrl: './error-messager.component.html',
  styleUrl: './error-messager.component.css'
})
export class ErrorMessagerComponent {

  errorLastTimeout: any;

  showErrorMessage(text: string) {
    const errorMessage = document.getElementById('error-message')!;
    errorMessage.children[0].textContent = text;

    errorMessage.classList.remove('error-message-outcome');

    try {
      clearTimeout(this.errorLastTimeout);
    } catch (e) {

    }

    setTimeout(() => {
      errorMessage.style.display = 'block';
      errorMessage.classList.add('error-message-outcome');
    }, 1)

    this.errorLastTimeout = setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000)
  }
}
