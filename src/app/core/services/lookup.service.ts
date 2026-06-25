import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PaymentTypeRequest, PaymentTypeResponse,
  WhomRequest, WhomResponse,
  OfficeExpenseRequest, OfficeExpenseResponse,
  CompanyBankRequest, CompanyBankResponse,
  InstallmentTermRequest, InstallmentTermResponse,
} from '../models/lookup.models';

@Injectable({ providedIn: 'root' })
export class LookupService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/lookup`;

  // Payment Types
  getPaymentTypes(): Observable<PaymentTypeResponse[]> { return this.http.get<PaymentTypeResponse[]>(`${this.base}/payment-types`); }
  createPaymentType(dto: PaymentTypeRequest): Observable<PaymentTypeResponse> { return this.http.post<PaymentTypeResponse>(`${this.base}/payment-types`, dto); }
  updatePaymentType(id: number, dto: PaymentTypeRequest): Observable<PaymentTypeResponse> { return this.http.put<PaymentTypeResponse>(`${this.base}/payment-types/${id}`, dto); }
  deletePaymentType(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/payment-types/${id}`); }

  // Whoms
  getWhoms(): Observable<WhomResponse[]> { return this.http.get<WhomResponse[]>(`${this.base}/whoms`); }
  createWhom(dto: WhomRequest): Observable<WhomResponse> { return this.http.post<WhomResponse>(`${this.base}/whoms`, dto); }
  updateWhom(id: number, dto: WhomRequest): Observable<WhomResponse> { return this.http.put<WhomResponse>(`${this.base}/whoms/${id}`, dto); }
  deleteWhom(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/whoms/${id}`); }

  // Office Expenses
  getOfficeExpenses(): Observable<OfficeExpenseResponse[]> { return this.http.get<OfficeExpenseResponse[]>(`${this.base}/office-expenses`); }
  createOfficeExpense(dto: OfficeExpenseRequest): Observable<OfficeExpenseResponse> { return this.http.post<OfficeExpenseResponse>(`${this.base}/office-expenses`, dto); }
  updateOfficeExpense(id: number, dto: OfficeExpenseRequest): Observable<OfficeExpenseResponse> { return this.http.put<OfficeExpenseResponse>(`${this.base}/office-expenses/${id}`, dto); }
  deleteOfficeExpense(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/office-expenses/${id}`); }

  // Company Banks
  getBanksByCompany(companyId: number): Observable<CompanyBankResponse[]> { return this.http.get<CompanyBankResponse[]>(`${this.base}/banks/company/${companyId}`); }
  createBank(dto: CompanyBankRequest): Observable<CompanyBankResponse> { return this.http.post<CompanyBankResponse>(`${this.base}/banks`, dto); }
  updateBank(id: number, dto: CompanyBankRequest): Observable<CompanyBankResponse> { return this.http.put<CompanyBankResponse>(`${this.base}/banks/${id}`, dto); }
  deleteBank(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/banks/${id}`); }

  // Installment Terms
  getInstallmentTerms(): Observable<InstallmentTermResponse[]> { return this.http.get<InstallmentTermResponse[]>(`${this.base}/installment-terms`); }
  createInstallmentTerm(dto: InstallmentTermRequest): Observable<InstallmentTermResponse> { return this.http.post<InstallmentTermResponse>(`${this.base}/installment-terms`, dto); }
  updateInstallmentTerm(id: number, dto: InstallmentTermRequest): Observable<InstallmentTermResponse> { return this.http.put<InstallmentTermResponse>(`${this.base}/installment-terms/${id}`, dto); }
  deleteInstallmentTerm(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/installment-terms/${id}`); }
}
