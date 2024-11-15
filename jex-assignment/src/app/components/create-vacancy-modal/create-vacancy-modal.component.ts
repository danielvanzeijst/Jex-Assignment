import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Vacancy } from '../../services/vacancy.service';

@Component({
  selector: 'app-create-vacancy-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-vacancy-modal.component.html'
})
export class CreateVacancyModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Omit<Vacancy, 'id'>>();

  title = new FormControl<string|null>(null);
  salaryMin = new FormControl<number|null>(null);
  salaryMax = new FormControl<number|null>(null);

  handleSave() {
    if(this.title.value && this.salaryMin.value && this.salaryMax.value) {
      this.save.emit({
        title: this.title.value,
        salaryMin: this.salaryMin.value,
        salaryMax: this.salaryMax.value,
        companyId: ''
      });
      this.close.emit();
    }
  }

  handleClose() {
    this.close.emit();
  }
}