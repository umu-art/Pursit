import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SitterCardComponent, SitterInfo} from '../sitter-card/sitter-card.component';
import {NgClass, NgForOf} from '@angular/common';
import {ApmService} from '../../lib/apm.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SitterCardComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  sitters: SitterInfo[];
  category: string | null;

  constructor(private apmService: ApmService,
              private router: Router) {
    const url: string = this.router.routerState.snapshot.url;
    const params = new URLSearchParams(new URL(url, "https://some.ru/").search);
    this.category = params.get('category');
    this.sitters = [];
    this.updateList()
  }

  updateList() {
    switch (this.category) {
      case 'pet-sitting':
        this.sitters = [
          // {
          //   photoUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/31/3176746612593fe67cb30f42eb7d6a5a6fd6ebda_full.jpg',
          //   name: 'Гадя Петрович Хренова',
          //   shortDescription: 'Я — опытный и заботливый ситтер с глубокой любовью к животным и ответственным подходом к их уходу. С детства окружённый животными, я с лёгкостью нахожу общий язык даже с самыми требовательными питомцами. Моя цель — создать комфортные условия для каждого животного, чтобы оно чувствовало себя в безопасности и счастливо, пока его владельцы отсутствуют.',
          //   fullDescription: 'Я — опытный и заботливый ситтер с глубокой любовью к животным и ответственным подходом к их уходу. С детства окружённый животными, я с лёгкостью нахожу общий язык даже с самыми требовательными питомцами. Моя цель — создать комфортные условия для каждого животного, чтобы оно чувствовало себя в безопасности и счастливо, пока его владельцы отсутствуют.\n' +
          //     '\n' +
          //     '\n' +
          //     'Навыки и компетенции3\n' +
          //     ' Уверенноезнаниеповедениясобак,кошекимелкихживотныхZ\n' +
          //     ' Профессиональныйподходкуходу:откормлениядомедицинскихпроцедурZ\n' +
          //     ' Способностьсправлятьсясэкстреннымиситуациями,включаяоказаниепервой\n' +
          //     'помощиZ\n' +
          //     ' Открытостьктребованиямвладельцев,втомчислеспецифическимдиетамили\n' +
          //     'поведенческим особенностямZ\n' +
          //     ' Спокойствие,терпениеиумениенаходитьиндивидуальныйподходккаждому\n' +
          //     'питомцу.\n' +
          //     '\n' +
          //     '\n' +
          //     'Опыт работы3\n' +
          //     ' Ситтердомашнихживотных(3года(\n' +
          //     ' Осуществлялуходзасобаками,кошкамиидругимиживотнымивовремя отпусков и поездок владельцевZ\n' +
          //     ' Организовывалактивныепрогулки,игрыисоциальноевзаимодействиедля собакZ\n' +
          //     ' Обеспечивалсвоевременноекормлениеиуходсучётомособыхпотребностей питомцевZ\n' +
          //     ' Поддерживалчистотужилогопространстваживотных,следилзаих безопасностьюZ\n' +
          //     ' Регулярнопредоставлялфото-ивидеоотчётывладельцам,чтобыонибыли спокойны за своих любимцев.\n' +
          //     '\n' +
          //     '\n' +
          //     'Дополнительно3\n' +
          //     ' УспешнопрошёлкурспервойпомощиживотнымZ\n' +
          //     ' ЗнаюосновызоопсихологиииумеюработатьстревожнымипитомцамиZ\n' +
          //     ' Способенобеспечитьуходзаживотнымисмедицинскимиособенностями\n' +
          //     '(например, диабет или аллергии).\n' +
          //     '\n' +
          //     '\n' +
          //     'Личные качества:\n' +
          //     'Ответственный, спокойный, внимательный к деталям и неуклонно следую инструкциям владельцев. Я обожаю животных и делаю всё возможное, чтобы каждый из них чувствовал себя любимым и защищённым.',
          //   takeContext: 'Беру: кошек и собак\n' +
          //     ' Стаж: 228 лет\n' +
          //     'Готов сам приехать\n' +
          //     ' Цена: много деняг\n',
          //   photosUrls: [
          //     'https://sun9-32.userapi.com/impf/c840126/v840126014/43863/RWHPlQKbVu8.jpg?size=600x600&quality=96&sign=b00e2a9749b92fa90b0f27462ac47d0f&type=album',
          //     'https://sun9-32.userapi.com/impf/c840126/v840126014/43863/RWHPlQKbVu8.jpg?size=600x600&quality=96&sign=b00e2a9749b92fa90b0f27462ac47d0f&type=album',
          //     'https://sun9-32.userapi.com/impf/c840126/v840126014/43863/RWHPlQKbVu8.jpg?size=600x600&quality=96&sign=b00e2a9749b92fa90b0f27462ac47d0f&type=album',
          //     'https://sun9-32.userapi.com/impf/c840126/v840126014/43863/RWHPlQKbVu8.jpg?size=600x600&quality=96&sign=b00e2a9749b92fa90b0f27462ac47d0f&type=album',
          //     'https://sun9-32.userapi.com/impf/c840126/v840126014/43863/RWHPlQKbVu8.jpg?size=600x600&quality=96&sign=b00e2a9749b92fa90b0f27462ac47d0f&type=album',
          //     'https://sun9-32.userapi.com/impf/c840126/v840126014/43863/RWHPlQKbVu8.jpg?size=600x600&quality=96&sign=b00e2a9749b92fa90b0f27462ac47d0f&type=album',
          //     'https://sun9-87.userapi.com/impf/9oxWzweGW18JUX7hfoU3l5MesrCnYBruMaO47g/-ZMmjWtRR-4.jpg?size=0x0&quality=90&proxy=1&sign=75e4d1056ecfdd1545aba31862a9c8f2&c_uniq_tag=HQXyzm68a4TXT6GK47LRU76SLk4JVU1Now0RAyZ5f3U&type=video_thumb'
          //   ],
          //   contacts: '8 800 555 35 35'
          // },
        ];
        break;
      case 'pet-moving':
        this.sitters = [];
        break;
      case 'pet-health':
        this.sitters = [];
        break;
      default:
        this.router.navigate(['/home'])
          .catch(err => console.error(err));
        break;
    }
  }

  petSitting() {
    this.apmService.logGoto('opened pet-sitting', '');
    this.category = 'pet-sitting';
    this.updateList();
  }

  moralPetSitting() {
    this.apmService.logGoto('opened moral-pet-sitting', '');
    this.router.navigate(['/moral-pet-sitting'])
      .catch(err => console.error(err));
  }

  petMoving() {
    this.apmService.logGoto('opened pet-moving', '');
    this.category = 'pet-moving';
    this.updateList();
  }

  petHealth() {
    this.apmService.logGoto('opened pet-health', '');
    this.category = 'pet-health';
    this.updateList();
  }

  home() {
    this.router.navigate(['/home'])
      .catch(err => console.error(err));
  }

}
