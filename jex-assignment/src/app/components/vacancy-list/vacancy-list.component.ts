import { Component, OnInit, Input } from '@angular/core';
import { VacancyService, Vacancy } from '../../services/vacancy.service';
import { Company, CompanyService } from '../../services/company.service';
import { CreateVacancyModalComponent } from '../create-vacancy-modal/create-vacancy-modal.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-vacancy-list',
  standalone: true,
  imports: [CreateVacancyModalComponent, LoadingSpinnerComponent],
  templateUrl: './vacancy-list.component.html',
})
export class VacancyListComponent implements OnInit {
  vacancies: Vacancy[] = [];
  company: Company | undefined;
  showModal = false;
  isLoading = true;

  @Input() companyId!: string;

  constructor(private vacancyService: VacancyService, private companyService: CompanyService) {}

  ngOnInit() {
    if(this.companyId) {
      this.loadData();
    }
  }

  private loadData() {
    this.isLoading = true;
    this.companyService.getCompany(this.companyId).pipe(
      finalize(() => {
        this.vacancyService.getVacancies(this.companyId).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe({
          next: (vacancies: Vacancy[]) => {
            this.vacancies = vacancies;
          },
          error: (error) => {
            console.error('Error loading vacancies:', error);
          }
        });
      })
    ).subscribe({
      next: (company: Company) => {
        this.company = company;
      },
      error: (error) => {
        console.error('Error loading company:', error);
      }
    });
  }

  handleCreateVacancy(vacancy: Omit<Vacancy, 'id'>) {
    const newVacancy: Vacancy = {
      id: 0,
      ...vacancy,
      companyId: this.companyId
    };

    this.vacancyService.createVacancy(newVacancy).subscribe((createdVacancy: Vacancy) => {
      this.vacancies.push(createdVacancy);
    });
  }
}
