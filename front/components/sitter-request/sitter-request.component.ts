import {Component} from '@angular/core';
import {ReportsTarget, SitterDto, SittersService, SitterType, UserDto, UserService} from '../../pursit-api-ts';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ErrorMessagerComponent} from '../error-messager/error-messager.component';
import {ApmService} from '../../lib/apm.service';
import {parseTakes} from '../../src/utils';

@Component({
  selector: 'app-sitter-request',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ErrorMessagerComponent
  ],
  templateUrl: './sitter-request.component.html',
  styleUrl: './sitter-request.component.css'
})
export class SitterRequestComponent {
  selectedSitters: SitterDto[] = [];
  user: UserDto = {};
  type: string;
  form: FormGroup;
  sittersIds: string[] | undefined;

  constructor(
    userService: UserService,
    private apmService: ApmService,
    private sittersService: SittersService,
    private errorMessager: ErrorMessagerComponent,
    private router: Router,
    formBuilder: FormBuilder) {

    const url: string = this.router.routerState.snapshot.url;
    const params = new URLSearchParams(new URL(url, "https://some.ru/").search);

    switch (params.get('type')! as SitterType) {
      case "moral-pet-sitting":
        this.type = 'передержку с зоопсихологом';
        break
      case 'pet-sitting':
        this.type = 'передержку';
        break
      case 'pet-moving':
        this.type = 'перевозку';
        break
      case 'pet-health':
        this.type = 'выезд ветеринара';
        break
    }

    if (params.has('sitters')) {
      this.sittersIds = params.get('sitters')!.split(',');
      sittersService.getSittersByIds(this.sittersIds)
        .subscribe(sitters => this.selectedSitters = sitters);
    } else {
      this.selectedSitters = [];
    }

    userService.getSelf()
      .subscribe(u => this.user = u);

    this.form = formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      tg: ['', []],
      reportsTarget: [ReportsTarget.Tg, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      petName: ['', [Validators.required]],
      isCat: [true, [Validators.required]],
      breed: ['', [Validators.required]],
      isMale: [true, [Validators.required]],
      height: ['', [Validators.required]],
      hasVaccinations: [false, [Validators.required]],
      otherMessage: ['', []],
      needTake: [true, [Validators.required]],
      addressTake: ['', []],
    });
  }

  send() {
    if (!this.form.valid) {
      this.errorMessager.showErrorMessage('Некоторые поля не заполнены!');
      return;
    }

    this.sittersService.sendRequest({
      sitterIds: this.sittersIds,
      fullName: this.form.get('fullName')?.value,
      phone: this.form.get('phone')?.value,
      email: this.user.email,
      tg: this.form.get('tg')?.value,
      reportsTarget: this.form.get('reportsTarget')?.value,
      startDate: this.form.get('startDate')?.value,
      endDate: this.form.get('endDate')?.value,
      petName: this.form.get('petName')?.value,
      isCat: this.form.get('isCat')?.value,
      breed: this.form.get('breed')?.value,
      isMale: this.form.get('isMale')?.value,
      height: this.form.get('height')?.value,
      hasVaccinations: this.form.get('hasVaccinations')?.value,
      otherMessage: this.form.get('otherMessage')?.value,
      needTake: this.form.get('needTake')?.value,
      addressTake: this.form.get('addressTake')?.value
    }).subscribe({
        complete: () => {
          this.router.navigate(['/thanks'])
            .catch(err => console.error(err));
        },
        error: err => {
          this.errorMessager.showErrorMessage(err.error);
          this.apmService.logError(err.error);
        }
      }
    )
  }


  getMinSum() {
    let res: number | undefined = this.selectedSitters[0].price!;
    for (const sitter of this.selectedSitters) {
      if (sitter.price && sitter.price < res) {
        res = sitter.price;
      }
    }

    const startDate: Date = this.form.get('startDate')?.value;
    const endDate: Date = this.form.get('endDate')?.value;
    const days = (endDate.getTime() - startDate.getTime()) / 86400000;

    if (days < 0) {
      return undefined;
    }

    return days * res;
  }

  getMaxSum() {
    let res: number | undefined = this.selectedSitters[0].price!;
    for (const sitter of this.selectedSitters) {
      if (sitter.price && sitter.price > res) {
        res = sitter.price;
      }
    }

    const startDate: Date = this.form.get('startDate')?.value;
    const endDate: Date = this.form.get('endDate')?.value;
    const days = (endDate.getTime() - startDate.getTime()) / 86400000;

    if (days < 0) {
      return undefined;
    }

    return days * res;
  }

  protected readonly parseTakes = parseTakes;
  protected readonly ReportsTarget = ReportsTarget;
}
