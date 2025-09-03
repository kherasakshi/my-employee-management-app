import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-medical-modal',
  standalone: false,
  templateUrl: './edit-medical-modal.component.html',
  styleUrl: './edit-medical-modal.component.css',
})
export class EditMedicalModalComponent implements OnInit { 
  medicalForm!: FormGroup;
  isDarkTheme = false;
  submitButton = 'Submit'
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditMedicalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar
  ) {
    this.dialogRef.backdropClick().subscribe(() => {
      this.snackbar.open('Modal closed without saving data', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  ngOnInit() {
    this.initForm();
    this.prefillFormEditor();
    this.loadTheme()
  }
  private initForm() {
    this.medicalForm = this.formBuilder.group({
      policyName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
      salary: [
        null,
        [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)],
      ],
      claimedAmount: [
        null,
        [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)],
      ],
      numberOfDependents: [
        null,
        [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)],
      ],
    });
  }

  private prefillFormEditor() {
    if (this.data) {
      this.medicalForm.patchValue(this.data);
      this.submitButton = "Update"
    } 
  }

  onSubmit() {
    if (this.medicalForm.valid) {
      const updatedMedical = {
        ...this.data,
        ...this.medicalForm.value,
      };
      this.dialogRef.close(updatedMedical);
    }
  }

  onCancel() {
    this.snackbar.open('Modal closed without saving data', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-warning'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.dialogRef.close();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
  }
}



