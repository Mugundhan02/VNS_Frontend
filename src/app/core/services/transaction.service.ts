import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ClientTransactionRequest, ClientTransactionResponse,
  SupplierTransactionRequest, SupplierTransactionResponse,
  SubContractorTransactionRequest, SubContractorTransactionResponse,
  CompanyExpenseTransactionRequest, CompanyExpenseTransactionResponse,
  ClientSummary, SupplierSummary, SubContractorSummary, CompanySummary,
} from '../models/transaction.models';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/transaction`;

  // Summaries
  getCompanySummary(companyId: number): Observable<CompanySummary> { return this.http.get<CompanySummary>(`${this.base}/summary/company/${companyId}`); }
  getClientSummary(clientId: number): Observable<ClientSummary> { return this.http.get<ClientSummary>(`${this.base}/summary/client/${clientId}`); }
  getSupplierSummary(clientId: number): Observable<SupplierSummary[]> { return this.http.get<SupplierSummary[]>(`${this.base}/summary/client/${clientId}/suppliers`); }
  getSubContractorSummary(clientId: number): Observable<SubContractorSummary[]> { return this.http.get<SubContractorSummary[]>(`${this.base}/summary/client/${clientId}/subcontractors`); }

  // Client Transactions
  getClientTransactions(clientId?: number): Observable<ClientTransactionResponse[]> {
    const params = clientId ? new HttpParams().set('clientId', clientId) : undefined;
    return this.http.get<ClientTransactionResponse[]>(`${this.base}/client`, { params });
  }
  getClientTransactionById(id: number): Observable<ClientTransactionResponse> { return this.http.get<ClientTransactionResponse>(`${this.base}/client/${id}`); }
  createClientTransaction(dto: ClientTransactionRequest): Observable<ClientTransactionResponse> { return this.http.post<ClientTransactionResponse>(`${this.base}/client`, dto); }
  updateClientTransaction(id: number, dto: ClientTransactionRequest): Observable<ClientTransactionResponse> { return this.http.put<ClientTransactionResponse>(`${this.base}/client/${id}`, dto); }
  deleteClientTransaction(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/client/${id}`); }

  // Supplier Transactions
  getSupplierTransactions(clientId?: number, supplierId?: number): Observable<SupplierTransactionResponse[]> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    if (supplierId) params = params.set('supplierId', supplierId);
    return this.http.get<SupplierTransactionResponse[]>(`${this.base}/supplier`, { params });
  }
  getSupplierTransactionById(id: number): Observable<SupplierTransactionResponse> { return this.http.get<SupplierTransactionResponse>(`${this.base}/supplier/${id}`); }
  createSupplierTransaction(dto: SupplierTransactionRequest): Observable<SupplierTransactionResponse> { return this.http.post<SupplierTransactionResponse>(`${this.base}/supplier`, dto); }
  updateSupplierTransaction(id: number, dto: SupplierTransactionRequest): Observable<SupplierTransactionResponse> { return this.http.put<SupplierTransactionResponse>(`${this.base}/supplier/${id}`, dto); }
  deleteSupplierTransaction(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/supplier/${id}`); }

  // SubContractor Transactions
  getSubContractorTransactions(clientId?: number, subContractorId?: number): Observable<SubContractorTransactionResponse[]> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    if (subContractorId) params = params.set('subContractorId', subContractorId);
    return this.http.get<SubContractorTransactionResponse[]>(`${this.base}/subcontractor`, { params });
  }
  getSubContractorTransactionById(id: number): Observable<SubContractorTransactionResponse> { return this.http.get<SubContractorTransactionResponse>(`${this.base}/subcontractor/${id}`); }
  createSubContractorTransaction(dto: SubContractorTransactionRequest): Observable<SubContractorTransactionResponse> { return this.http.post<SubContractorTransactionResponse>(`${this.base}/subcontractor`, dto); }
  updateSubContractorTransaction(id: number, dto: SubContractorTransactionRequest): Observable<SubContractorTransactionResponse> { return this.http.put<SubContractorTransactionResponse>(`${this.base}/subcontractor/${id}`, dto); }
  deleteSubContractorTransaction(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/subcontractor/${id}`); }

  // Expense Transactions
  getExpenseTransactions(companyId?: number, clientId?: number): Observable<CompanyExpenseTransactionResponse[]> {
    let params = new HttpParams();
    if (companyId) params = params.set('companyId', companyId);
    if (clientId) params = params.set('clientId', clientId);
    return this.http.get<CompanyExpenseTransactionResponse[]>(`${this.base}/expense`, { params });
  }
  getExpenseTransactionById(id: number): Observable<CompanyExpenseTransactionResponse> { return this.http.get<CompanyExpenseTransactionResponse>(`${this.base}/expense/${id}`); }
  createExpenseTransaction(dto: CompanyExpenseTransactionRequest): Observable<CompanyExpenseTransactionResponse> { return this.http.post<CompanyExpenseTransactionResponse>(`${this.base}/expense`, dto); }
  updateExpenseTransaction(id: number, dto: CompanyExpenseTransactionRequest): Observable<CompanyExpenseTransactionResponse> { return this.http.put<CompanyExpenseTransactionResponse>(`${this.base}/expense/${id}`, dto); }
  deleteExpenseTransaction(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/expense/${id}`); }
}
