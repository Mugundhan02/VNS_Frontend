import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierResponse, SupplierRequest } from '../../core/models/supplier.models';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { IfscService } from '../../core/services/ifsc.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-suppliers',
  imports: [FormsModule, ConfirmDialog],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class Suppliers implements OnInit {
  private readonly svc     = inject(SupplierService);
  private readonly ifscSvc = inject(IfscService);
  readonly auth            = inject(AuthService);

  items          = signal<SupplierResponse[]>([]);
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);
  search         = signal('');
  ifscLooking    = signal(false);
  ifscError      = signal('');

  form: SupplierRequest = { supplierName: '' };

  get filtered() {
    const q = this.search().toLowerCase();
    return this.items().filter(s => s.supplierName.toLowerCase().includes(q));
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: d => { this.items.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.form = { supplierName: '' };
    this.editingId.set(null);
    this.errorMsg.set('');
    this.ifscError.set('');
    this.showForm.set(true);
  }

  openEdit(item: SupplierResponse): void {
    this.editingId.set(item.supplierId);
    this.form = { ...item };
    this.errorMsg.set('');
    this.ifscError.set('');
    this.showForm.set(true);
  }

  lookupIfsc(): void {
    const ifsc = this.form.ifscCode?.trim() ?? '';
    if (ifsc.length !== 11) { this.ifscError.set('IFSC must be 11 characters.'); return; }
    this.ifscError.set('');
    this.ifscLooking.set(true);
    this.ifscSvc.lookup(ifsc).subscribe({
      next: data => {
        this.ifscLooking.set(false);
        if (!data) { this.ifscError.set('IFSC not found.'); return; }
        this.form.bankName   = data.BANK;
        this.form.bankBranch = data.BRANCH;
        this.form.branchCode = data.IFSC.substring(0, 4);
      },
      error: () => { this.ifscLooking.set(false); this.ifscError.set('Could not fetch IFSC details.'); },
    });
  }

  save(): void {
    if (!this.form.supplierName?.trim()) { this.errorMsg.set('Supplier name is required.'); return; }
    if (!this.form.accountNumber?.trim()) { this.errorMsg.set('Account number is required.'); return; }
    if (!this.form.ifscCode?.trim()) { this.errorMsg.set('IFSC code is required.'); return; }
    this.saving.set(true);
    this.errorMsg.set('');
    const id = this.editingId();
    const req = id ? this.svc.update(id, this.form) : this.svc.create(this.form);
    req.subscribe({
      next: () => { this.saving.set(false); this.showForm.set(false); this.load(); },
      error: (err: HttpErrorResponse) => { this.saving.set(false); this.errorMsg.set(err.error?.message ?? 'Save failed.'); },
    });
  }

  confirmDelete(id: number): void { this.deleteTargetId.set(id); this.showConfirm.set(true); }

  doDelete(): void {
    const id = this.deleteTargetId();
    if (!id) return;
    this.svc.delete(id).subscribe({ next: () => { this.showConfirm.set(false); this.load(); }, error: () => this.showConfirm.set(false) });
  }
}
