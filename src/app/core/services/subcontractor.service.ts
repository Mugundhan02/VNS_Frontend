import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubContractorRequest, SubContractorResponse } from '../models/subcontractor.models';

@Injectable({ providedIn: 'root' })
export class SubContractorService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/subcontractor`;

  getAll(): Observable<SubContractorResponse[]> { return this.http.get<SubContractorResponse[]>(this.url); }
  getById(id: number): Observable<SubContractorResponse> { return this.http.get<SubContractorResponse>(`${this.url}/${id}`); }
  create(dto: SubContractorRequest): Observable<SubContractorResponse> { return this.http.post<SubContractorResponse>(this.url, dto); }
  update(id: number, dto: SubContractorRequest): Observable<SubContractorResponse> { return this.http.put<SubContractorResponse>(`${this.url}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
