import {Component} from '@angular/core';
import {UserHolder} from '../../services/user-holder.service';
import {Router} from '@angular/router';
import {SitterDto, SittersService, SitterType} from '../../api-core-ts';
import {NgForOf, NgStyle} from '@angular/common';
import {TypeSelectComponent} from '../type-select/type-select.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    TypeSelectComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  protected sitters: Array<SitterDto> = [];
  protected type: SitterType = SitterType.PetSitting;

  constructor(userHolder: UserHolder,
              private router: Router,
              private sittersService: SittersService) {
    userHolder.checkAdmin(
      isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/home'])
            .catch(console.error);
        }
      }
    );

    this.reload();
  }

  protected reload() {
    this.sittersService.getSitters()
      .subscribe((resp) => {
        this.sitters = resp.filter(s => s.type == this.type);
      });
  }

  protected gotoSitterEdit(sitter: SitterDto | undefined) {
    if (sitter) {
      this.router.navigate(['/admin-sitter'], {queryParams: {sitterId: sitter.id}})
        .catch(console.error);
    } else {
      this.router.navigate(['/admin-sitter'])
        .catch(console.error);

    }
  }
}
