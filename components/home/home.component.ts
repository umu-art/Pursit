import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ApmService} from '../../lib/apm.service';
import {YoutubePlayerComponent} from 'ngx-youtube-player';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    YoutubePlayerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {

  private playedTime: number = 0;
  private startPlayingTime: number = 0;
  private isPlaying: boolean = false;

  constructor(private router: Router,
              private apmService: ApmService) {
  }

  petSitting() {
    this.apmService.logGoto('opened pet-sitting', '');
    this.router.navigate(['/list'], {queryParams: {category: 'pet-sitting'}})
      .catch(err => console.error(err));
  }

  moralPetSitting() {
    this.apmService.logGoto('opened moral-pet-sitting', '');
    this.router.navigate(['/moral-pet-sitting'])
      .catch(err => console.error(err));
  }

  petMoving() {
    this.apmService.logGoto('opened pet-moving', '');
    this.router.navigate(['/list'], {queryParams: {category: 'pet-moving'}})
      .catch(err => console.error(err));
  }

  petHealth() {
    this.apmService.logGoto('opened pet-health', '');
    this.router.navigate(['/list'], {queryParams: {category: 'pet-health'}})
      .catch(err => console.error(err));
  }

  youtube($event: any) {
    if ($event.data === 1) {
      this.isPlaying = true;
      this.startPlayingTime = new Date().getTime();
    } else if ($event.data === 2) {
      this.isPlaying = false;
      this.playedTime += new Date().getTime() - this.startPlayingTime;
    }
  }

  ngOnDestroy() {
    if (this.isPlaying) {
      this.playedTime += new Date().getTime() - this.startPlayingTime;
    }
    this.apmService.logGoto('watched video', this.playedTime.toString());
  }
}
