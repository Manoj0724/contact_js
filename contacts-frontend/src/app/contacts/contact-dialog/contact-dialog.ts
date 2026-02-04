import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './contact-dialog.html'
})
export class ContactDialogComponent {

  form = {
    firstName: '',
    lastName: '',
    mobile1: '',
    city: ''
  };

  constructor(
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.contact) {
      this.form = { ...data.contact };
    }
  }

  save(): void {
    this.dialogRef.close(this.form);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
