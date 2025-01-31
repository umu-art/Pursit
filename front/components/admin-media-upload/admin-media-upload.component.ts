import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MediaService} from '../../api-media-ts';
import {ErrorComponent} from '../error/error.component';

@Component({
  selector: 'app-admin-media-upload',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './admin-media-upload.component.html',
  styleUrl: './admin-media-upload.component.css'
})
export class AdminMediaUploadComponent {

  constructor(private mediaService: MediaService,
              private error: ErrorComponent) {
  }

  @Output() mediaId: EventEmitter<string> = new EventEmitter();
  @ViewChild('fileInput') fileInput!: ElementRef;

  onUpload() {
    const fileInput = this.fileInput.nativeElement as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      this.error.showErrorMessage('No file selected');
      return;
    }

    const file = fileInput.files[0];

    this.mediaService.upload(file).subscribe({
      next: (response) => {
        this.error.showErrorMessage('Upload successful');
        this.mediaId.emit(response.mediaId);
      },
      error: (error) => {
        this.error.showErrorMessage('Upload failed ' + error.message);
      }
    });
  }
}
