import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ErrorComponent} from '../error/error.component';
import {ApmService} from '../../services/apm.service';
import {parseTakes} from '../../src/utils';
import {UserHolder} from '../../services/user-holder.service';
import {ReportsTarget, SitterDto, SittersService, SitterType, UserDto} from '../../api-core-ts';

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
    ErrorComponent
  ],
  templateUrl: './sitter-request.component.html',
  styleUrl: './sitter-request.component.css'
})
export class SitterRequestComponent {
  selectedSitters: SitterDto[] = [];
  user: UserDto = {};
  type: SitterType;
  title: string;
  form: FormGroup;
  sittersIds: string[] | undefined;

  constructor(
    protected userService: UserHolder,
    private apmService: ApmService,
    private sittersService: SittersService,
    private errorMessager: ErrorComponent,
    private router: Router,
    protected formBuilder: FormBuilder) {

    if (!userService.isLogined()) {
      router.navigate(['/home'])
        .catch(console.error);
    }

    this.user = userService.currentUser!;

    const url: string = this.router.routerState.snapshot.url;
    const params = new URLSearchParams(new URL(url, "https://some.ru/").search);
    this.type = params.get('type')! as SitterType;

    switch (this.type) {
      case "moral-pet-sitting":
        this.title = 'передержку с зоопсихологом';
        break
      case 'pet-sitting':
        this.title = 'передержку';
        break
      case 'pet-moving':
        this.title = 'перевозку';
        break
      case 'pet-health':
        this.title = 'выезд ветеринара';
        break
    }

    if (this.type) {
      this.sittersIds = params.get('sitters')!.split(',');
      sittersService.getSittersByIds(this.sittersIds)
        .subscribe({
          next: sitters => this.selectedSitters = sitters,
          error: () => router.navigate(['/home'])
            .catch(err => console.error(err))
        });
    } else {
      this.selectedSitters = [];
    }

    switch (params.get('type')! as SitterType) {
      case SitterType.PetSitting:
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
        break;
      case SitterType.PetHealth:
      case SitterType.PetMoving:
        this.form = formBuilder.group({
          fullName: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          tg: ['', []],
          reportsTarget: [ReportsTarget.Tg, [Validators.required]],
          startDate: ['', [Validators.required]],
          petName: ['', [Validators.required]],
          isCat: [true, [Validators.required]],
          breed: ['', [Validators.required]],
          isMale: [true, [Validators.required]],
          height: ['', [Validators.required]],
          hasVaccinations: [false, [Validators.required]],
          otherMessage: ['', []],
          addressTake: ['', [Validators.required]],
        });
        break;
      default:
        this.form = formBuilder.group({});
        break;
    }

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
      startDate: new Date(this.form.get('startDate')?.value).toISOString(),
      endDate: new Date(this.form.get('endDate')?.value).toISOString(),
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
    if (!this.selectedSitters ||
      this.selectedSitters.length === 0) {
      return 0;
    }

    let res: number | undefined = this.selectedSitters[0].price!;
    for (const sitter of this.selectedSitters) {
      if (sitter.price && sitter.price < res) {
        res = sitter.price;
      }
    }

    if (!this.form.get('startDate')?.value || !this.form.get('endDate')?.value) {
      return 0;
    }

    const startDate = Date.parse(this.form.get('startDate')?.value);
    const endDate = Date.parse(this.form.get('endDate')?.value);
    const days = (endDate - startDate) / 86400000;

    if (days < 0) {
      return 0;
    }

    return (days + 1) * res;
  }

  getMaxSum() {
    if (!this.selectedSitters ||
      this.selectedSitters.length === 0) {
      return 0;
    }

    let res: number | undefined = this.selectedSitters[0].price!;
    for (const sitter of this.selectedSitters) {
      if (sitter.price && sitter.price > res) {
        res = sitter.price;
      }
    }

    if (!this.form.get('startDate')?.value || !this.form.get('endDate')?.value) {
      return 0;
    }

    const startDate = Date.parse(this.form.get('startDate')?.value);
    const endDate = Date.parse(this.form.get('endDate')?.value);
    const days = (endDate - startDate) / 86400000;

    if (days < 0) {
      return 0;
    }

    return (days + 1) * res;
  }

  protected readonly parseTakes = parseTakes;
  protected readonly ReportsTarget = ReportsTarget;
  protected readonly SitterType = SitterType;
}
