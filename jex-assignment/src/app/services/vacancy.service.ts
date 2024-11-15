import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vacancy {
  id: number;
  companyId: string;
  title: string;
  salaryMin: number;
  salaryMax: number;
}

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private apiUrl = `${environment.apiBaseUrl}/listing`;

  constructor(private http: HttpClient) {}

  getVacancies(companyId?: string): Observable<Vacancy[]> {
    let params = new HttpParams();
    if (companyId) {
      params = params.set('filter[companyId]', companyId.toString());
    }
    return this.http.get<{ listing: Vacancy[] }>(this.apiUrl, { params }).pipe(
      map((response) => response.listing)
    );
  }

  createVacancy(vacancy: Vacancy): Observable<Vacancy> {
    const body = { listing: vacancy };
    return this.http.post<{listing: Vacancy}>(this.apiUrl, body).pipe(
      map((response) => response.listing)
    );
  }
}
