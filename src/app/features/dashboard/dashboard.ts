import { Component, inject, signal, OnInit } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { SupplierService } from '../../core/services/supplier.service';
import { SubContractorService } from '../../core/services/subcontractor.service';
import { MaterialService } from '../../core/services/material.service';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly clientSvc = inject(ClientService);
  private readonly supplierSvc = inject(SupplierService);
  private readonly subSvc = inject(SubContractorService);
  private readonly matSvc = inject(MaterialService);
  readonly auth = inject(AuthService);

  clientCount   = signal(0);
  supplierCount = signal(0);
  subCount      = signal(0);
  materialCount = signal(0);
  jobWorkCount  = signal(0);
  loading       = signal(true);

  ngOnInit(): void {
    const isAdminOrOwner = this.auth.hasRole('Owner', 'Admin');
    const requests = [];

    if (isAdminOrOwner) {
      this.clientSvc.getAll().subscribe({ next: d => this.clientCount.set(d.length), error: () => {} });
      this.supplierSvc.getAll().subscribe({ next: d => this.supplierCount.set(d.length), error: () => {} });
      this.subSvc.getAll().subscribe({ next: d => this.subCount.set(d.length), error: () => {} });
    }
    this.matSvc.getAllMaterials().subscribe({ next: d => this.materialCount.set(d.length), error: () => {} });
    this.matSvc.getAllJobWorks().subscribe({ next: d => { this.jobWorkCount.set(d.length); this.loading.set(false); }, error: () => this.loading.set(false) });
  }
}
