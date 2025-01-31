import {Component} from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

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
