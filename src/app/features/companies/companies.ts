import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../core/services/company.service';
import { CompanyResponse, CompanyRequest } from '../../core/models/company.models';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-companies',
  imports: [FormsModule, ConfirmDialog],
  templateUrl: './companies.html',
  styleUrl: './companies.css',
})
export class Companies implements OnInit {
  private readonly svc = inject(CompanyService);
  readonly auth = inject(AuthService);

  items          = signal<CompanyResponse[]>([]);
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);

  form: CompanyRequest = { companyName: '' };

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: d => { this.items.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.form = { companyName: '' };
    this.editingId.set(null);
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  openEdit(item: CompanyResponse): void {
    this.editingId.set(item.companyId);
    this.form = { ...item };
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  save(): void {
    if (!this.form.companyName?.trim()) { this.errorMsg.set('Company name is required.'); return; }
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
