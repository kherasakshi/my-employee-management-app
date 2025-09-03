import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActionButtonComponentRenderer } from '../../shared/action-button-renderer/action-button.component.renderer';
import { EditMedicalModalComponent } from '../../modal-form/edit-medical-modal/edit-medical-modal.component';

import { NotificationService } from '../../services/notifications/notification.service';
import { EmployeeMedicalService } from '../../services/employee-medical/employee-medical-details.service';

@Component({
  selector: 'app-employee-medical-details',
  standalone: false,
  templateUrl: './employee-medical.component.html',
  styleUrl: './employee-medical.component.css',
})
export class EmployeeMedicalDetailsComponent {
  hasError = false;
  loading = true;
  quickFilterValue = '';
  rowData: any[] = [];

  columnDefs = [
    {
      headerName: '# of Dependents',
      field: 'numberOfDependents',
      width: 170,
      sortable: true,
      valueParser: (params: any) => {
        const value = params.newValue;
        return Number(value);
      },
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Policy Name',
      field: 'policyName',
      width: 190,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      getQuickFilterText: (params: any) => params.value.toString(),
    },
    {
      headerName: 'Claimed Amount',
      field: 'claimedAmount',
      width: 190,
      sortable: true,
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      valueParser: (params: any) => {
        const value = params.newValue;
        return Number(value);
      },
      valueFormatter: this.currencyFormatter,
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Policy Max Amount',
      width: 190,
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      valueGetter: (params: any) => {
        const salary = params.data.salary;
        return salary <= 500000 ? 1000000 : salary * 2.5;
      },
      valueFormatter: this.currencyFormatter,
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Balance Left',
      width: 190,
      valueParser: (params: any) => {
        const value = params.newValue;
        return Number(value);
      },
      valueGetter: (params: any) => {
        const salary = params.data.salary;
        const claimed = params.data.claimedAmount;
        const policyMaxAmt = salary <= 500000 ? 1000000 : salary * 2.5;
        return policyMaxAmt - claimed;
      },
      valueFormatter: this.currencyFormatter,
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonComponentRenderer,
      width: 160,
    },
  ];

  constructor(
    private modalForm: MatDialog,
    private snackbar: MatSnackBar,
    private medicalService: EmployeeMedicalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.medicalService.hasError.subscribe((error: boolean) => {
      this.hasError = error;
      if (error) {
        this.loading = false;
      }
    });
    this.medicalService.employeeMedical.subscribe((data) => {
      this.rowData = data;
      console.log('MEDICAL DETAILS!', data);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
    this.medicalService.fetchMedicalDetails();
  }

  onQuickFilterChanged(event: any) {
    this.quickFilterValue = event.target.value.toLowerCase();
  }

  currencyFormatter(params: any) {
    return `₹${params.value.toLocaleString()}`;
  }

  openModal() {
    const dialogRef = this.modalForm.open(EditMedicalModalComponent, {
      width: '550px',
      maxHeight: '100vh',
      disableClose: false,
      panelClass: 'custom-modalbox',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Medical Details after adding', result);
      if (result) {
        this.loading = true;
        console.log('Medical Details After Closed', result);
        this.medicalService.addMedicalDetails(result).subscribe(() => {
          this.snackbar.open('Medical details added!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.notificationService.showNotification(
            'HR notification!', 'Employee medical details Added Successfully'
          );    
          this.medicalService.fetchMedicalDetails();
        });
      }
    });
  }

  getTotalDependents(): number {
    return this.rowData.reduce(
      (total, emp) => total + Number(emp.numberOfDependents || 0),
      0
    );
  }

  onDelete(row: any) {
    const confirmDelete = confirm(
      `Are you sure you want to delete medical details!`
    );

    if (confirmDelete) {
      console.log('Row to delete', row);
      this.medicalService.deleteEmployee(row.id).subscribe({
        next: () => {
          this.snackbar.open('Medical details deleted!', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.notificationService.showNotification(
            'HR notification!',
            'Employee medical details deleted successfully!!'
          );   
          console.log('Employee deleted successfully:', row);
        },
        error: (err: any) => {
          console.error('Error deleting employee', err);
        },
      });
    }
  }

  onEdit(row: any) {
    const dialogRef = this.modalForm.open(EditMedicalModalComponent, {
      width: '550px',
      maxHeight: '100vh',
      disableClose: false,
      panelClass: 'custom-modalbox',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Medical Details after editing', result);
      if (result) {
        const updatedData = { ...row, ...result };
        this.loading = true;
        this.medicalService
          .updateMedicalDetails(row.id, updatedData)
          .subscribe({
            next: () => {
              this.snackbar.open('Medical details updated!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              this.notificationService.showNotification(
                'HR notification!',
                'Employee medical details edited successfully!!'
              );   
              this.medicalService.fetchMedicalDetails();
            },
            error: (err) => {
              console.error('Error updating employee', err);
              this.snackbar.open('Failed to update details!', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-error'],
              });
              this.loading = false;
            },
          });
      }
    });
  }
}





































