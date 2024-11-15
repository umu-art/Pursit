import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ApmService} from '../../lib/apm.service';
import {YoutubePlayerComponent} from 'ngx-youtube-player';
import {NgForOf} from '@angular/common';

class FaqQuestion {
  q: string = ''
  a: string = ''
  opened: boolean = false
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    YoutubePlayerComponent,
    NgForOf
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
    if (this.playedTime > 0) {
      this.apmService.logGoto('watched video', this.playedTime.toString());
    }
  }

  faq: FaqQuestion[] = [
    {
      q: "Каких животных вы берёте на передержку?",
      a: "Мы принимаем собак и кошек любых пород.",
      opened: false
    },
    {
      q: "Какие буду условия проживания у питомца?",
      a: "Ситтер обеспечит вашего любимца просторным и комфортным помещением, где он не будет ощущать дискомфорт.",
      opened: false
    },
    {
      q: "Как я могу заказать услугу для своего питомца?",
      a: "Вам достаточно перейти на соответствующую страницу с услугой и выбрать из списка того человека, которому вы доверите своего питомца.",
      opened: false
    },
    {
      q: "Можно ли заранее встретиться с ситтером и посмотреть место, где будет происходить передержка?",
      a: "Конечно, для этого нужно будет связаться с понравившимся вам ситтером и назначить встречу.",
      opened: false
    },
    {
      q: "Каковы цены на ваши услуги?",
      a: "Цены зависят от того, кто предоставляет услуги и того, какого питомца вы захотите ему доверить.",
      opened: false
    },
    {
      q: "Почему я могу быть уверен, что с моим питомцем всё хорошо?",
      a: "Вам будут предоставляться постоянные фотографии и видео вашего питомца, по которым вы сможете с лёгкостью отследить его состояние.",
      opened: false
    },
    {
      q: "Можно ли предоставлять свои корма и принадлежности?",
      a: "Да, желательно принести привычную еду и вещи вашего питомца (игрушки, миски, лежак), чтобы снизить стресс от временной смены обстановки.",
      opened: false
    }
  ]

  showFaq(index: number) {
    this.faq[index].opened = !this.faq[index].opened;
  }

  protected readonly document = document;
}
