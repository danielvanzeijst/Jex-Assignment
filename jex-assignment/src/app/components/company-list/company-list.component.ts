import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../../services/company.service';
import { RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  isLoading = true;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.isLoading = true;
    this.companyService.getCompanies().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (companies: Company[]) => {
        this.companies = companies;
      },
      error: (error) => {
        console.error('Error loading companies:', error);
      }
    });
  }
}
