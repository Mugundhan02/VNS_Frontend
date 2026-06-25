import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MaterialRequest, MaterialResponse, JobWorkRequest, JobWorkResponse } from '../models/material.models';

@Injectable({ providedIn: 'root' })
export class MaterialService {
  private readonly http = inject(HttpClient);
  private readonly matUrl = `${environment.apiUrl}/material`;
  private readonly jobUrl = `${environment.apiUrl}/jobwork`;

  getAllMaterials(): Observable<MaterialResponse[]> { return this.http.get<MaterialResponse[]>(this.matUrl); }
  getMaterialById(id: number): Observable<MaterialResponse> { return this.http.get<MaterialResponse>(`${this.matUrl}/${id}`); }
  createMaterial(dto: MaterialRequest): Observable<MaterialResponse> { return this.http.post<MaterialResponse>(this.matUrl, dto); }
  updateMaterial(id: number, dto: MaterialRequest): Observable<MaterialResponse> { return this.http.put<MaterialResponse>(`${this.matUrl}/${id}`, dto); }
  deleteMaterial(id: number): Observable<void> { return this.http.delete<void>(`${this.matUrl}/${id}`); }

  getAllJobWorks(): Observable<JobWorkResponse[]> { return this.http.get<JobWorkResponse[]>(this.jobUrl); }
  getJobWorkById(id: number): Observable<JobWorkResponse> { return this.http.get<JobWorkResponse>(`${this.jobUrl}/${id}`); }
  createJobWork(dto: JobWorkRequest): Observable<JobWorkResponse> { return this.http.post<JobWorkResponse>(this.jobUrl, dto); }
  updateJobWork(id: number, dto: JobWorkRequest): Observable<JobWorkResponse> { return this.http.put<JobWorkResponse>(`${this.jobUrl}/${id}`, dto); }
  deleteJobWork(id: number): Observable<void> { return this.http.delete<void>(`${this.jobUrl}/${id}`); }
}
