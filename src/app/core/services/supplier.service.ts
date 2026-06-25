import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupplierRequest, SupplierResponse } from '../models/supplier.models';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/supplier`;

  getAll(): Observable<SupplierResponse[]> { return this.http.get<SupplierResponse[]>(this.url); }
  getById(id: number): Observable<SupplierResponse> { return this.http.get<SupplierResponse>(`${this.url}/${id}`); }
  create(dto: SupplierRequest): Observable<SupplierResponse> { return this.http.post<SupplierResponse>(this.url, dto); }
  update(id: number, dto: SupplierRequest): Observable<SupplierResponse> { return this.http.put<SupplierResponse>(`${this.url}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
