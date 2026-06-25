import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';
import { ClientService } from '../../core/services/client.service';
import { SupplierService } from '../../core/services/supplier.service';
import { SubContractorService } from '../../core/services/subcontractor.service';
import { MaterialService } from '../../core/services/material.service';
import { LookupService } from '../../core/services/lookup.service';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { ClientResponse } from '../../core/models/client.models';
import { SupplierResponse } from '../../core/models/supplier.models';
import { SubContractorResponse } from '../../core/models/subcontractor.models';
import { MaterialResponse, JobWorkResponse } from '../../core/models/material.models';
import { PaymentTypeResponse, WhomResponse } from '../../core/models/lookup.models';
import {
  ClientTransactionResponse, ClientTransactionRequest,
  SupplierTransactionResponse, SupplierTransactionRequest,
  SubContractorTransactionResponse, SubContractorTransactionRequest,
} from '../../core/models/transaction.models';
import { HttpErrorResponse } from '@angular/common/http';

type TxTab = 'client' | 'supplier' | 'subcontractor';

@Component({
  selector: 'app-transactions',
  imports: [FormsModule, ConfirmDialog, DecimalPipe, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  private readonly svc     = inject(TransactionService);
  private readonly clientSvc = inject(ClientService);
  private readonly suppSvc   = inject(SupplierService);
  private readonly subSvc    = inject(SubContractorService);
  private readonly matSvc    = inject(MaterialService);
  private readonly lookupSvc = inject(LookupService);
  readonly auth              = inject(AuthService);

  activeTab      = signal<TxTab>('client');
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);

  // Lookup data
  clients      = signal<ClientResponse[]>([]);
  suppliers    = signal<SupplierResponse[]>([]);
  subContractors = signal<SubContractorResponse[]>([]);
  materials    = signal<MaterialResponse[]>([]);
  jobWorks     = signal<JobWorkResponse[]>([]);
  paymentTypes = signal<PaymentTypeResponse[]>([]);
  whoms        = signal<WhomResponse[]>([]);

  // Tx data
  clientTxs  = signal<ClientTransactionResponse[]>([]);
  suppTxs    = signal<SupplierTransactionResponse[]>([]);
  subTxs     = signal<SubContractorTransactionResponse[]>([]);

  // Forms
  clientForm: ClientTransactionRequest = this.emptyClientForm();
  suppForm: SupplierTransactionRequest = this.emptySuppForm();
  subForm: SubContractorTransactionRequest = this.emptySubForm();

  ngOnInit(): void {
    this.loadLookups();
    this.loadTxData();
  }

  loadLookups(): void {
    this.clientSvc.getAll().subscribe({ next: d => this.clients.set(d), error: () => {} });
    this.suppSvc.getAll().subscribe({ next: d => this.suppliers.set(d), error: () => {} });
    this.subSvc.getAll().subscribe({ next: d => this.subContractors.set(d), error: () => {} });
    this.matSvc.getAllMaterials().subscribe({ next: d => this.materials.set(d), error: () => {} });
    this.matSvc.getAllJobWorks().subscribe({ next: d => this.jobWorks.set(d), error: () => {} });
    this.lookupSvc.getPaymentTypes().subscribe({ next: d => this.paymentTypes.set(d), error: () => {} });
    this.lookupSvc.getWhoms().subscribe({ next: d => this.whoms.set(d), error: () => {} });
  }

  loadTxData(): void {
    this.loading.set(true);
    this.svc.getClientTransactions().subscribe({ next: d => this.clientTxs.set(d), error: () => {} });
    this.svc.getSupplierTransactions().subscribe({ next: d => this.suppTxs.set(d), error: () => {} });
    this.svc.getSubContractorTransactions().subscribe({ next: d => { this.subTxs.set(d); this.loading.set(false); }, error: () => this.loading.set(false) });
  }

  setTab(tab: TxTab): void { this.activeTab.set(tab); }

  openCreate(): void {
    this.editingId.set(null);
    this.errorMsg.set('');
    const today = new Date().toISOString().split('T')[0];
    if (this.activeTab() === 'client') this.clientForm = { ...this.emptyClientForm(), transactionDate: today };
    else if (this.activeTab() === 'supplier') this.suppForm = { ...this.emptySuppForm(), transactionDate: today };
    else this.subForm = { ...this.emptySubForm(), transactionDate: today };
    this.showForm.set(true);
  }

  save(): void {
    this.saving.set(true);
    this.errorMsg.set('');
    const id = this.editingId();

    const successHandler = () => {
      this.saving.set(false);
      this.showForm.set(false);
      this.loadTxData();
    };
    const errorHandler = (err: HttpErrorResponse) => {
      this.saving.set(false);
      this.errorMsg.set(err.error?.message ?? 'Save failed.');
    };

    if (this.activeTab() === 'client') {
      (id ? this.svc.updateClientTransaction(id, this.clientForm) : this.svc.createClientTransaction(this.clientForm))
        .subscribe({ next: successHandler, error: errorHandler });
    } else if (this.activeTab() === 'supplier') {
      (id ? this.svc.updateSupplierTransaction(id, this.suppForm) : this.svc.createSupplierTransaction(this.suppForm))
        .subscribe({ next: successHandler, error: errorHandler });
    } else {
      (id ? this.svc.updateSubContractorTransaction(id, this.subForm) : this.svc.createSubContractorTransaction(this.subForm))
        .subscribe({ next: successHandler, error: errorHandler });
    }
  }

  confirmDelete(id: number): void { this.deleteTargetId.set(id); this.showConfirm.set(true); }

  doDelete(): void {
    const id = this.deleteTargetId();
    if (!id) return;
    let req;
    if (this.activeTab() === 'client') req = this.svc.deleteClientTransaction(id);
    else if (this.activeTab() === 'supplier') req = this.svc.deleteSupplierTransaction(id);
    else req = this.svc.deleteSubContractorTransaction(id);
    req.subscribe({ next: () => { this.showConfirm.set(false); this.loadTxData(); }, error: () => this.showConfirm.set(false) });
  }

  private emptyClientForm(): ClientTransactionRequest {
    return { transactionDate: '', clientId: 0, creditAmount: 0, debitAmount: 0 };
  }
  private emptySuppForm(): SupplierTransactionRequest {
    return { transactionDate: '', clientId: 0, supplierId: 0, materialId: 0, quantity: 0, rate: 0, amount: 0, paidAmount: 0, isSubBill: false };
  }
  private emptySubForm(): SubContractorTransactionRequest {
    return { transactionDate: '', clientId: 0, subContractorId: 0, jobWorkId: 0, quantity: 0, rate: 0, amount: 0, paidAmount: 0, isSubBill: false };
  }
}
