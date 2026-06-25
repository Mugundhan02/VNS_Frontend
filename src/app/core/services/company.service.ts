import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompanyRequest, CompanyResponse, CompanyUserRequest, CompanyUserUpdateRequest, CompanyUserResponse } from '../models/company.models';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly http = inject(HttpClient);
  private readonly companyUrl = `${environment.apiUrl}/company`;
  private readonly userUrl = `${environment.apiUrl}/companyuser`;

  // Companies
  getAll(): Observable<CompanyResponse[]> { return this.http.get<CompanyResponse[]>(this.companyUrl); }
  getById(id: number): Observable<CompanyResponse> { return this.http.get<CompanyResponse>(`${this.companyUrl}/${id}`); }
  create(dto: CompanyRequest): Observable<CompanyResponse> { return this.http.post<CompanyResponse>(this.companyUrl, dto); }
  update(id: number, dto: CompanyRequest): Observable<CompanyResponse> { return this.http.put<CompanyResponse>(`${this.companyUrl}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.companyUrl}/${id}`); }

  // Company Users
  getAllUsers(): Observable<CompanyUserResponse[]> { return this.http.get<CompanyUserResponse[]>(this.userUrl); }
  getUserById(id: number): Observable<CompanyUserResponse> { return this.http.get<CompanyUserResponse>(`${this.userUrl}/${id}`); }
  createUser(dto: CompanyUserRequest): Observable<CompanyUserResponse> { return this.http.post<CompanyUserResponse>(this.userUrl, dto); }
  updateUser(id: number, dto: CompanyUserUpdateRequest): Observable<CompanyUserResponse> { return this.http.put<CompanyUserResponse>(`${this.userUrl}/${id}`, dto); }
  deleteUser(id: number): Observable<void> { return this.http.delete<void>(`${this.userUrl}/${id}`); }
}
