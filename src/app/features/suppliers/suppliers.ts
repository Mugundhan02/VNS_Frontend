import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierResponse, SupplierRequest } from '../../core/models/supplier.models';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-suppliers',
  imports: [FormsModule, ConfirmDialog],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class Suppliers implements OnInit {
  private readonly svc = inject(SupplierService);
  readonly auth = inject(AuthService);

  items          = signal<SupplierResponse[]>([]);
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);
  search         = signal('');

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
    this.showForm.set(true);
  }

  openEdit(item: SupplierResponse): void {
    this.editingId.set(item.supplierId);
    this.form = { ...item };
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  save(): void {
    if (!this.form.supplierName?.trim()) { this.errorMsg.set('Supplier name is required.'); return; }
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
