import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SitterType} from '../../api-core-ts';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-type-select',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './type-select.component.html',
  styleUrl: './type-select.component.css'
})
export class TypeSelectComponent {
  @Input() type: SitterType = SitterType.PetSitting;
  @Output() typeChange = new EventEmitter<SitterType>();

  protected vals = [
    {
      type: SitterType.MoralPetSitting,
      name: 'передержка с зоопсихологом'
    },
    {
      type: SitterType.PetSitting,
      name: 'передержка'
    },
    {
      type: SitterType.PetHealth,
      name: 'ветеринар'
    },
    {
      type: SitterType.PetMoving,
      name: 'перевозка'
    }
  ]

  onTypeChange(newType: SitterType) {
    this.typeChange.emit(newType);
  }
}
