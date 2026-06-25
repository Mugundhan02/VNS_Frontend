import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ClientService } from '../../core/services/client.service';
import { ClientResponse, ClientRequest } from '../../core/models/client.models';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  imports: [FormsModule, ConfirmDialog, DecimalPipe],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {
  private readonly svc = inject(ClientService);
  readonly auth = inject(AuthService);

  items         = signal<ClientResponse[]>([]);
  loading       = signal(true);
  saving        = signal(false);
  errorMsg      = signal('');
  showForm      = signal(false);
  showConfirm   = signal(false);
  editingId     = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);
  search        = signal('');

  form: ClientRequest = this.emptyForm();

  get filtered() {
    const q = this.search().toLowerCase();
    return this.items().filter(c => c.clientName.toLowerCase().includes(q));
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: d => { this.items.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.form = this.emptyForm();
    this.editingId.set(null);
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  openEdit(item: ClientResponse): void {
    this.editingId.set(item.clientId);
    this.form = {
      clientName: item.clientName,
      doorNoAndStreetName: item.doorNoAndStreetName,
      areaName: item.areaName,
      place: item.place,
      pinCode: item.pinCode,
      cityOrTalukName: item.cityOrTalukName,
      districtAndStateName: item.districtAndStateName,
      phoneNumber: item.phoneNumber,
      mobileNumber: item.mobileNumber,
      faxNumber: item.faxNumber,
      emailId: item.emailId,
      websiteName: item.websiteName,
      accountName: item.accountName,
      accountType: item.accountType,
      bankName: item.bankName,
      bankBranch: item.bankBranch,
      ifscCode: item.ifscCode,
      estimateUnit: item.estimateUnit,
      estimateRate: item.estimateRate,
      estimateAmount: item.estimateAmount,
    };
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  save(): void {
    if (!this.form.clientName?.trim()) { this.errorMsg.set('Client name is required.'); return; }
    this.saving.set(true);
    this.errorMsg.set('');
    const id = this.editingId();
    const req = id ? this.svc.update(id, this.form) : this.svc.create(this.form);
    req.subscribe({
      next: () => { this.saving.set(false); this.showForm.set(false); this.load(); },
      error: (err: HttpErrorResponse) => {
        this.saving.set(false);
        this.errorMsg.set(err.error?.message ?? 'Save failed. Please try again.');
      },
    });
  }

  confirmDelete(id: number): void {
    this.deleteTargetId.set(id);
    this.showConfirm.set(true);
  }

  doDelete(): void {
    const id = this.deleteTargetId();
    if (!id) return;
    this.svc.delete(id).subscribe({
      next: () => { this.showConfirm.set(false); this.load(); },
      error: () => this.showConfirm.set(false),
    });
  }

  private emptyForm(): ClientRequest {
    return { clientName: '', estimateUnit: undefined, estimateRate: undefined, estimateAmount: undefined };
  }
}
