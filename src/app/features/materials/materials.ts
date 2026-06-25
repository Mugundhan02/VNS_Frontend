import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { MaterialService } from '../../core/services/material.service';
import { MaterialResponse, MaterialRequest, JobWorkResponse, JobWorkRequest } from '../../core/models/material.models';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { HttpErrorResponse } from '@angular/common/http';

type ActiveTab = 'materials' | 'jobworks';

@Component({
  selector: 'app-materials',
  imports: [FormsModule, ConfirmDialog, DecimalPipe],
  templateUrl: './materials.html',
  styleUrl: './materials.css',
})
export class Materials implements OnInit {
  private readonly svc = inject(MaterialService);
  readonly auth = inject(AuthService);

  activeTab      = signal<ActiveTab>('materials');
  materials      = signal<MaterialResponse[]>([]);
  jobWorks       = signal<JobWorkResponse[]>([]);
  loading        = signal(true);
  saving         = signal(false);
  errorMsg       = signal('');
  showForm       = signal(false);
  showConfirm    = signal(false);
  editingId      = signal<number | null>(null);
  deleteTargetId = signal<number | null>(null);
  search         = signal('');

  matForm: MaterialRequest = { materialName: '', rate: 0 };
  jwForm: JobWorkRequest   = { jobWorkName: '', rate: 0 };

  get filteredMaterials() {
    const q = this.search().toLowerCase();
    return this.materials().filter(m => m.materialName.toLowerCase().includes(q));
  }

  get filteredJobWorks() {
    const q = this.search().toLowerCase();
    return this.jobWorks().filter(j => j.jobWorkName.toLowerCase().includes(q));
  }

  ngOnInit(): void { this.loadAll(); }

  loadAll(): void {
    this.loading.set(true);
    this.svc.getAllMaterials().subscribe({ next: d => this.materials.set(d), error: () => {} });
    this.svc.getAllJobWorks().subscribe({ next: d => { this.jobWorks.set(d); this.loading.set(false); }, error: () => this.loading.set(false) });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.errorMsg.set('');
    if (this.activeTab() === 'materials') this.matForm = { materialName: '', rate: 0 };
    else this.jwForm = { jobWorkName: '', rate: 0 };
    this.showForm.set(true);
  }

  openEdit(item: MaterialResponse | JobWorkResponse): void {
    this.errorMsg.set('');
    if (this.activeTab() === 'materials') {
      const m = item as MaterialResponse;
      this.editingId.set(m.materialId);
      this.matForm = { materialName: m.materialName, unit: m.unit, rate: m.rate };
    } else {
      const j = item as JobWorkResponse;
      this.editingId.set(j.jobWorkId);
      this.jwForm = { jobWorkName: j.jobWorkName, unit: j.unit, rate: j.rate };
    }
    this.showForm.set(true);
  }

  save(): void {
    this.saving.set(true);
    this.errorMsg.set('');
    const id = this.editingId();
    const isMat = this.activeTab() === 'materials';

    const successHandler = () => {
      this.saving.set(false);
      this.showForm.set(false);
      this.loadAll();
    };
    const errorHandler = (err: HttpErrorResponse) => {
      this.saving.set(false);
      this.errorMsg.set(err.error?.message ?? 'Save failed.');
    };

    if (isMat) {
      (id ? this.svc.updateMaterial(id, this.matForm) : this.svc.createMaterial(this.matForm))
        .subscribe({ next: successHandler, error: errorHandler });
    } else {
      (id ? this.svc.updateJobWork(id, this.jwForm) : this.svc.createJobWork(this.jwForm))
        .subscribe({ next: successHandler, error: errorHandler });
    }
  }

  confirmDelete(id: number): void { this.deleteTargetId.set(id); this.showConfirm.set(true); }

  doDelete(): void {
    const id = this.deleteTargetId();
    if (!id) return;
    const req = this.activeTab() === 'materials' ? this.svc.deleteMaterial(id) : this.svc.deleteJobWork(id);
    req.subscribe({ next: () => { this.showConfirm.set(false); this.loadAll(); }, error: () => this.showConfirm.set(false) });
  }
}
