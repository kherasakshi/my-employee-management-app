import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ActionButtonComponentRenderer } from '../../shared/action-button-renderer/action-button.component.renderer';
import { AddEmployeeModalComponent } from '../../modal-form/add-employee-modal/add-employee-modal.component';
import { NotificationService } from '../../services/notifications/notification.service';
import { EmployeeListService } from '../../services/employee-lists/employee-list.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  hasError = false;
  loading = true;
  rowData: any[] = [];
  quickFilterValue = '';

 
  columnDefs = [
    {
      field: '#',
      headerName: '#',
      width: 80,
      valueGetter: 'node.rowIndex + 1',
    },
    {
      field: 'firstName',
      headerName: 'First',
      width: 100,
      filter: 'agTextColumnFilter',
      getQuickFilterText: (params: any) => params.value.toString(),
    },
    {
      field: 'lastName',
      headerName: 'Last',
      width: 100,
      filter: 'agTextColumnFilter',
      getQuickFilterText: (params: any) => params.value.toString(),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      filter: 'agTextColumnFilter',
      getQuickFilterText: (params: any) => params.value.toString(),
    },
    {
      headerName: 'Age',
      field: 'age',
      sortable: true,
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      width: 100,
      valueParser: (params: any) => {
        const value = params.newValue;
        return Number(value);
      },
      getQuickFilterText: () => '',
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      getQuickFilterText: () => '',
    },
    {
      field: 'birthDate',
      headerName: 'DOB',
      width: 150,
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      valueFormatter: (params: any) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-CA');
      },
      getQuickFilterText: () => '',
    },
    {
      field: 'profession',
      headerName: 'Profession',
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      getQuickFilterText: () => '',
    },
    {
      field: 'hobbies',
      headerName: 'Hobbies',
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      getQuickFilterText: () => '',
    },
    {
      field: 'sportInterest',
      headerName: 'Sport Interest',
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonComponentRenderer,
      width: 130,
    },
  ];

  frameworkComponents = {
    ActionButtonRenderer: ActionButtonComponentRenderer,
  };

  constructor(
    private employeeService: EmployeeListService,
    private modalForm: MatDialog,
    private snackbar: MatSnackBar,
    public translateService: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.employeeService.hasError.subscribe((err) => {
      this.hasError = err;
    });

    this.employeeService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });

    this.employeeService.employeeList.subscribe((data) => {
      this.rowData = data;
      console.log('Employee list updated:', data);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });

    this.employeeService.fetchEmployee();
  }
  

  onQuickFilterChanged(event: any) {
    this.quickFilterValue = event.target.value.toLowerCase();
  }

  onDelete(row: any) {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${row.firstName} ${row.lastName}?`
    );
    if (confirmDelete) {
      this.employeeService.deleteEmployee(row.id).subscribe({
        next: () => {
          this.snackbar.open('Employee deleted!', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
       this.notificationService.showNotification('Candidate Deleted', 'HR Notification! Candidate Deleted')
        },
        error: (err) => {
          console.error('Error deleting employee', err);
        },
      });
    }
  }

  onAddEmployee() {
    const dialogRef = this.modalForm.open(AddEmployeeModalComponent, {
      width: '550px',
      maxHeight: '100vh',
      disableClose: false,
      panelClass: 'custom-modalbox',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('EMPLOYEE LIST AFTER ADDED:', result);
      if (result && result.id) {
        this.loading = true;
        this.employeeService.fetchEmployee();
      this.notificationService.showNotification(
        'Candidate Added!',
        'HR Notification! Candidate Added'
      );
      }
    });
  }

  onEdit(row: any) {
    const dialogRef = this.modalForm.open(AddEmployeeModalComponent, {
      width: '550px',
      maxHeight: '100vh',
      disableClose: false,
      panelClass: 'custom-modalbox',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('RESULT OF EMPLOYEE LIST AFTER EDITING', result);
      if (result && result.id) {
        this.loading = true;
        this.employeeService.fetchEmployee();
      this.notificationService.showNotification(
        'Candidate Updated!',
        'HR Notification! Candidate Updated'
      );
      }
    });
  }
}



















































