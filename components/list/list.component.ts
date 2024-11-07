import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SitterCardComponent} from '../sitter-card/sitter-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SitterCardComponent,
    NgForOf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  sitters: string[];

  constructor(private router: Router) {
    const url: string = this.router.routerState.snapshot.url;
    const params = new URLSearchParams(new URL(url, "https://some.ru/").search);
    const category = params.get('category');
    this.sitters = [];

    switch (category) {
      case 'pet-sitting':
        this.sitters = [
          'pet-sitting sitter 1',
          'pet-sitting sitter 2',
          'pet-sitting sitter 3',
        ];
        break;
      case 'pet-moving':
        this.sitters = [
          'pet-moving sitter 1',
          'pet-moving sitter 2',
          'pet-moving sitter 3',
        ];
        break;
      case 'pet-health':
        this.sitters = [
          'pet-health sitter 1',
          'pet-health sitter 2',
          'pet-health sitter 3',
        ];
        break;
      default:
        router.navigate(['/home'])
          .catch(err => console.error(err));
        break;
    }
  }

  home() {
    this.router.navigate(['/home'])
      .catch(err => console.error(err));
  }

}
