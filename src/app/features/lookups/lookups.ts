import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { LookupService } from '../../core/services/lookup.service';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { IfscService } from '../../core/services/ifsc.service';
import {
  PaymentTypeResponse, WhomResponse,
  OfficeExpenseResponse, InstallmentTermResponse,
  CompanyBankRequest, CompanyBankResponse,
} from '../../core/models/lookup.models';
import { HttpErrorResponse } from '@angular/common/http';

type LookupTab = 'payment-types' | 'whoms' | 'office-expenses' | 'installment-terms';

@Component({
  selector: 'app-lookups',
  imports: [FormsModule, ConfirmDialog, SlicePipe],
  templateUrl: './lookups.html',
  styleUrl: './lookups.css',
})
export class Lookups implements OnInit {
  private readonly svc = inject(LookupService);
  readonly auth = inject(AuthService);

  activeTab      = signal<LookupTab>('payment-types');
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);

  paymentTypes     = signal<PaymentTypeResponse[]>([]);
  whoms            = signal<WhomResponse[]>([]);
  officeExpenses   = signal<OfficeExpenseResponse[]>([]);
  installmentTerms = signal<InstallmentTermResponse[]>([]);

  // Shared single-field form
  nameValue    = signal('');
  // Installment term extra fields
  numInstallments = signal<number | undefined>(undefined);
  description  = signal('');

  ngOnInit(): void { this.loadAll(); }

  loadAll(): void {
    this.loading.set(true);
    this.svc.getPaymentTypes().subscribe({ next: d => this.paymentTypes.set(d), error: () => {} });
    this.svc.getWhoms().subscribe({ next: d => this.whoms.set(d), error: () => {} });
    this.svc.getOfficeExpenses().subscribe({ next: d => this.officeExpenses.set(d), error: () => {} });
    this.svc.getInstallmentTerms().subscribe({ next: d => { this.installmentTerms.set(d); this.loading.set(false); }, error: () => this.loading.set(false) });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.nameValue.set('');
    this.numInstallments.set(undefined);
    this.description.set('');
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  openEdit(id: number, name: string, extra?: { num?: number; desc?: string }): void {
    this.editingId.set(id);
    this.nameValue.set(name);
    this.numInstallments.set(extra?.num);
    this.description.set(extra?.desc ?? '');
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  save(): void {
    const name = this.nameValue().trim();
    if (!name) { this.errorMsg.set('Name is required.'); return; }
    this.saving.set(true);
    this.errorMsg.set('');
    const id = this.editingId();

    const successHandler = () => {
      this.saving.set(false);
      this.showForm.set(false);
      this.loadAll();
    };
    const errorHandler = (err: HttpErrorResponse) => {
      this.saving.set(false);
      this.errorMsg.set(err.error?.message ?? 'Save failed.');
    };

    switch (this.activeTab()) {
      case 'payment-types':
        (id ? this.svc.updatePaymentType(id, { paymentTypeName: name }) : this.svc.createPaymentType({ paymentTypeName: name }))
          .subscribe({ next: successHandler, error: errorHandler });
        break;
      case 'whoms':
        (id ? this.svc.updateWhom(id, { whomName: name }) : this.svc.createWhom({ whomName: name }))
          .subscribe({ next: successHandler, error: errorHandler });
        break;
      case 'office-expenses':
        (id ? this.svc.updateOfficeExpense(id, { expenseName: name }) : this.svc.createOfficeExpense({ expenseName: name }))
          .subscribe({ next: successHandler, error: errorHandler });
        break;
      default:
        (id
          ? this.svc.updateInstallmentTerm(id, { termName: name, numberOfInstallments: this.numInstallments(), description: this.description() })
          : this.svc.createInstallmentTerm({ termName: name, numberOfInstallments: this.numInstallments(), description: this.description() }))
          .subscribe({ next: successHandler, error: errorHandler });
    }
  }

  confirmDelete(id: number): void { this.deleteTargetId.set(id); this.showConfirm.set(true); }

  doDelete(): void {
    const id = this.deleteTargetId();
    if (!id) return;
    let req;
    switch (this.activeTab()) {
      case 'payment-types':    req = this.svc.deletePaymentType(id); break;
      case 'whoms':            req = this.svc.deleteWhom(id); break;
      case 'office-expenses':  req = this.svc.deleteOfficeExpense(id); break;
      default:                 req = this.svc.deleteInstallmentTerm(id);
    }
    req.subscribe({ next: () => { this.showConfirm.set(false); this.loadAll(); }, error: () => this.showConfirm.set(false) });
  }

  tabLabel(tab: LookupTab): string {
    return { 'payment-types': 'Payment Types', 'whoms': 'Whoms', 'office-expenses': 'Office Expenses', 'installment-terms': 'Installment Terms' }[tab];
  }
}
