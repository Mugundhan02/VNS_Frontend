import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  template: `
    <div class="modal-backdrop" role="dialog" aria-modal="true" [attr.aria-label]="title()">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">{{ title() }}</h2>
        </div>
        <div class="modal-body">
          <p>{{ message() }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="cancel.emit()">Cancel</button>
          <button class="btn btn-danger" (click)="confirm.emit()">{{ confirmLabel() }}</button>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmDialog {
  title        = input('Confirm');
  message      = input('Are you sure?');
  confirmLabel = input('Delete');
  confirm      = output<void>();
  cancel       = output<void>();
}
