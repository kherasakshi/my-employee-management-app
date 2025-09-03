import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Employee } from '../../employee-portal/employee-list/interface-model/employee-model';

import { take } from 'rxjs';
import { EmployeeListService } from '../../services/employee-lists/employee-list.service';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css'],
  standalone: false,
})
export class AddEmployeeModalComponent implements OnInit {
  addUserForm!: FormGroup;
  sports: string[] = ['Cricket', 'Basketball', 'Football', 'Badminton'];
  isDarkTheme = false;
  professions: { id: string; name: string }[] = [];
  title = 'Add User';
  submitButtonLabel = 'Submit';

  constructor(
    private formBuilder: FormBuilder,
    private employeeListService: EmployeeListService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEmployeeModalComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadTheme();
    this.prefillFormEditor();
    this.fetchProfession();
    this.dialogRef.backdropClick().subscribe(() => {
      this.snackBar.open('Modal closed without saving data', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  private initForm() {
    this.addUserForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      birthDate: ['', Validators.required],
      profession: ['', Validators.required],
      sportInterest: ['', Validators.required],
      showExtras: [false],
      hobbies: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  private prefillFormEditor() {
    if (this.data && this.data.id) {
      this.title = 'Edit User';
      this.submitButtonLabel = 'Update';
      this.addUserForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.addUserForm.invalid) return;

    const formValue = {
      ...this.addUserForm.value,
    };

    if (this.data && this.data.id) {
      this.editEmployee(formValue);
    } else {
      this.addEmployee(formValue);
    }
  }

  private addEmployee(employeeData: Employee) {
    this.employeeListService.employeeList
      .pipe(take(1))
      .subscribe((employeeList) => {
        const isDuplicateEmail = employeeList.find(
          (emp) => emp.email.toLowerCase() === employeeData.email.toLowerCase()
        );

        if (isDuplicateEmail) {
          this.snackBar.open(
            'This email is already exists. Please enter another email!',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-success'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          return;
        }

        this.employeeListService.addEmployee(employeeData).subscribe({
          next: (savedEmployeeWithId) => {
            this.snackBar.open('Employee Added!', 'Close', {
              duration: 2000,
              panelClass: ['snackbar-success'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.dialogRef.close(savedEmployeeWithId);
          },
          error: (err) => {
            console.error('Add failed', err);
          },
        });
      });
  }
  private editEmployee(employeeData: any) {
    this.employeeListService.employeeList
      .pipe(take(1))
      .subscribe((employee) => {
        const isDuplicateEmail = employee.find(
          (emp) =>
            emp.email.toLowerCase() === employeeData.email.toLowerCase() &&
            emp.id !== this.data.id
        );
        if (isDuplicateEmail) {
          this.snackBar.open(
            'This email is already exists.Please update another email!!',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-success'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          return;
        }
      });

    this.employeeListService
      .updateEmployee(this.data.id, employeeData)
      .subscribe({
        next: () => {
          this.snackBar.open('Employee Updated!', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close({ id: this.data.id });
        },
        error: (err) => {
          console.error('Update failed', err);
        },
      });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
  }

  private fetchProfession() {
    this.employeeListService.getProfessions().subscribe({
      next: (data) => {
        this.professions = data;
      },
      error: (err) => {
        console.log('Failed to load professions', err);
      },
    });
  }

  get showExtras() {
    return this.addUserForm.get('showExtras')?.value;
  }

  onCloseClick() {
    this.snackBar.open('Modal closed without saving data', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-warning'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.dialogRef.close();
  }
}
