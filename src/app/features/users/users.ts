import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../core/services/company.service';
import { CompanyUserResponse, CompanyUserRequest, CompanyUserUpdateRequest } from '../../core/models/company.models';
import { CompanyResponse } from '../../core/models/company.models';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  imports: [FormsModule, ConfirmDialog],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private readonly svc = inject(CompanyService);
  readonly auth = inject(AuthService);

  items          = signal<CompanyUserResponse[]>([]);
  companies      = signal<CompanyResponse[]>([]);
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);

  createForm: CompanyUserRequest = { companyId: 0, userName: '', password: '', userType: 'User' };
  updateForm: CompanyUserUpdateRequest = { userName: '', userType: 'User', isActive: true };
  isEditing = false;

  readonly userTypes = ['Owner', 'Admin', 'User'];

  ngOnInit(): void {
    this.svc.getAll().subscribe({ next: d => this.companies.set(d), error: () => {} });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.svc.getAllUsers().subscribe({
      next: d => { this.items.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.isEditing = false;
    this.createForm = { companyId: 0, userName: '', password: '', userType: 'User' };
    this.editingId.set(null);
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  openEdit(item: CompanyUserResponse): void {
    this.isEditing = true;
    this.editingId.set(item.companyUserId);
    this.updateForm = { userName: item.userName, userType: item.userType, isActive: item.isActive };
    this.errorMsg.set('');
    this.showForm.set(true);
  }

  save(): void {
    this.saving.set(true);
    this.errorMsg.set('');
    const id = this.editingId();
    const req = this.isEditing
      ? this.svc.updateUser(id!, this.updateForm)
      : this.svc.createUser(this.createForm);
    req.subscribe({
      next: () => { this.saving.set(false); this.showForm.set(false); this.load(); },
      error: (err: HttpErrorResponse) => { this.saving.set(false); this.errorMsg.set(err.error?.message ?? 'Save failed.'); },
    });
  }

  confirmDelete(id: number): void { this.deleteTargetId.set(id); this.showConfirm.set(true); }

  doDelete(): void {
    const id = this.deleteTargetId();
    if (!id) return;
    this.svc.deleteUser(id).subscribe({ next: () => { this.showConfirm.set(false); this.load(); }, error: () => this.showConfirm.set(false) });
  }
}
