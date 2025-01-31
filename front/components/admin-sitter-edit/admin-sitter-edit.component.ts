import {Component} from '@angular/core';
import {UserHolder} from '../../services/user-holder.service';
import {Router} from '@angular/router';
import {SitterDto, SittersService} from '../../api-core-ts';
import {ErrorComponent} from '../error/error.component';
import {TypeSelectComponent} from '../type-select/type-select.component';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SitterCardComponent} from '../sitter-card/sitter-card.component';
import {AdminMediaUploadComponent} from '../admin-media-upload/admin-media-upload.component';

@Component({
  selector: 'app-admin-sitter-edit',
  standalone: true,
  imports: [
    CommonModule,
    TypeSelectComponent,
    FormsModule,
    SitterCardComponent,
    AdminMediaUploadComponent,
    NgOptimizedImage
  ],
  providers: [ErrorComponent],
  templateUrl: './admin-sitter-edit.component.html',
  styleUrl: './admin-sitter-edit.component.css'
})
export class AdminSitterEditComponent {

  protected sitter: SitterDto = {
    photos: [],
    geolocation: {
      latitude: 0,
      longitude: 0
    }
  };

  constructor(userHolder: UserHolder,
              private error: ErrorComponent,
              private sittersService: SittersService,
              protected router: Router) {
    userHolder.checkAdmin(
      isAdmin => {
        if (!isAdmin) {
          router.navigate(['/home'])
            .catch(console.error);
        }
      }
    );

    const url: string = this.router.routerState.snapshot.url;
    const params = new URLSearchParams(new URL(url, "https://some.ru/").search);
    const sitterId = params.get('sitterId');

    if (sitterId) {
      sittersService.getSittersByIds([sitterId])
        .subscribe({
          next: sitters => this.sitter = sitters[0],
          error: resp => this.error.showErrorMessage(resp.error)
        })
    }
  }

  deletePhoto(photo: string): void {
    if (this.sitter.photos) {
      this.sitter.photos = this.sitter.photos.filter(s => s !== photo);
    }
  }

  protected save() {
    this.sittersService.upsertSitter(this.sitter)
      .subscribe({
        next: () => this.router.navigate(['/admin'])
          .catch(console.error),
        error: resp => this.error.showErrorMessage(resp.error)
      })
  }

  protected delete() {
    if (!this.sitter.id) {
      this.router.navigate(['/admin'])
        .catch(console.error);
      return;
    }

    this.sittersService.deleteSitter(this.sitter.id)
      .subscribe({
        next: () => this.router.navigate(['/admin'])
          .catch(console.error),
        error: resp => this.error.showErrorMessage(resp.error)
      })
  }

  protected readonly setTimeout = setTimeout;
}
