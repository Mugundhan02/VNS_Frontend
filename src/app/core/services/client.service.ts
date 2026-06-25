import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClientRequest, ClientResponse } from '../models/client.models';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/client`;

  getAll(): Observable<ClientResponse[]> {
    return this.http.get<ClientResponse[]>(this.url);
  }

  getById(id: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.url}/${id}`);
  }

  create(dto: ClientRequest): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(this.url, dto);
  }

  update(id: number, dto: ClientRequest): Observable<ClientResponse> {
    return this.http.put<ClientResponse>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
