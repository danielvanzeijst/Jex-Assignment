import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Company {
  id: number;
  name: string;
  location: string;
  rating: string;
}

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private apiUrl = `${environment.apiBaseUrl}/company`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<{ company: Company[] }>(this.apiUrl).pipe(
      map((response) => response.company)
    );
  }

  getCompany(companyId: string): Observable<Company> {
      let params = new HttpParams();
      params = params.set('filter[id]', companyId);
    return this.http.get<{ company: Company[] }>(this.apiUrl, { params }).pipe(
      map((response) => response.company[0])
    );
  }
}