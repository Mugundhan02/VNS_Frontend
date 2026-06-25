import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ClientService } from '../../core/services/client.service';
import { CompanyService } from '../../core/services/company.service';
import { TransactionService } from '../../core/services/transaction.service';
import { ClientResponse } from '../../core/models/client.models';
import { CompanyResponse } from '../../core/models/company.models';
import {
  CompanySummary, ClientSummary,
  SupplierSummary, SubContractorSummary,
} from '../../core/models/transaction.models';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, DecimalPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly txSvc      = inject(TransactionService);
  private readonly clientSvc  = inject(ClientService);
  private readonly companySvc = inject(CompanyService);
  readonly auth               = inject(AuthService);

  // Companies & Clients for dropdowns
  companies = signal<CompanyResponse[]>([]);
  clients   = signal<ClientResponse[]>([]);

  selectedCompanyId = signal<number>(0);
  selectedClientId  = signal<number>(0);

  // Summary data
  companySummary    = signal<CompanySummary | null>(null);
  clientSummary     = signal<ClientSummary | null>(null);
  supplierSummaries = signal<SupplierSummary[]>([]);
  subConSummaries   = signal<SubContractorSummary[]>([]);

  loadingCompany  = signal(false);
  loadingClient   = signal(false);
  loadingSupplier = signal(false);
  loadingSub      = signal(false);

  isAdminOrOwner = this.auth.hasRole('Owner', 'Admin');

  ngOnInit(): void {
    if (!this.isAdminOrOwner) return;

    this.companySvc.getAll().subscribe({
      next: companies => {
        this.companies.set(companies);
        if (companies.length) {
          this.selectedCompanyId.set(companies[0].companyId);
          this.loadCompanySummary(companies[0].companyId);
        }
      },
      error: () => {},
    });

    this.clientSvc.getAll().subscribe({
      next: clients => {
        this.clients.set(clients);
        if (clients.length) {
          this.selectedClientId.set(clients[0].clientId);
          this.loadClientData(clients[0].clientId);
        }
      },
      error: () => {},
    });
  }

  onCompanyChange(id: number): void {
    this.selectedCompanyId.set(+id);
    this.loadCompanySummary(+id);
  }

  onClientChange(id: number): void {
    this.selectedClientId.set(+id);
    this.loadClientData(+id);
  }

  private loadCompanySummary(id: number): void {
    this.loadingCompany.set(true);
    this.txSvc.getCompanySummary(id).subscribe({
      next: s => { this.companySummary.set(s); this.loadingCompany.set(false); },
      error: () => this.loadingCompany.set(false),
    });
  }

  private loadClientData(id: number): void {
    this.loadingClient.set(true);
    this.loadingSupplier.set(true);
    this.loadingSub.set(true);

    this.txSvc.getClientSummary(id).subscribe({
      next: s => { this.clientSummary.set(s); this.loadingClient.set(false); },
      error: () => this.loadingClient.set(false),
    });
    this.txSvc.getSupplierSummary(id).subscribe({
      next: s => { this.supplierSummaries.set(s); this.loadingSupplier.set(false); },
      error: () => this.loadingSupplier.set(false),
    });
    this.txSvc.getSubContractorSummary(id).subscribe({
      next: s => { this.subConSummaries.set(s); this.loadingSub.set(false); },
      error: () => this.loadingSub.set(false),
    });
  }

  get supplierTotals() {
    return this.supplierSummaries().reduce(
      (acc, s) => ({ payable: acc.payable + s.payableAmount, paid: acc.paid + s.paidAmount, balance: acc.balance + s.balanceAmount }),
      { payable: 0, paid: 0, balance: 0 },
    );
  }

  get subConTotals() {
    return this.subConSummaries().reduce(
      (acc, s) => ({ payable: acc.payable + s.payableAmount, paid: acc.paid + s.paidAmount, balance: acc.balance + s.balanceAmount }),
      { payable: 0, paid: 0, balance: 0 },
    );
  }
}
