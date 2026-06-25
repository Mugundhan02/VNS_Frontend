import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubContractorService } from '../../core/services/subcontractor.service';
import { SubContractorResponse, SubContractorRequest } from '../../core/models/subcontractor.models';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subcontractors',
  imports: [FormsModule, ConfirmDialog],
  templateUrl: './subcontractors.html',
  styleUrl: './subcontractors.css',
})
export class SubContractors implements OnInit {
  private readonly svc = inject(SubContractorService);
  readonly auth = inject(AuthService);

  items          = signal<SubContractorResponse[]>([]);
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);
  search         = signal('');

  form: SubContractorRequest = { subContractorName: '' };

  get filtered() {
    const q = this.search().toLowerCase();
    return this.items().filter(s => s.subContractorName.toLowerCase().includes(q));
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
    this.form = { subContractorName: '' };
    this.editingId.set(null);
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  openEdit(item: SubContractorResponse): void {
    this.editingId.set(item.subContractorId);
    this.form = { ...item };
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  save(): void {
    if (!this.form.subContractorName?.trim()) { this.errorMsg.set('Name is required.'); return; }
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
