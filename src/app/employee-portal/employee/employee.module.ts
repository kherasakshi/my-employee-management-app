import { NgModule } from '@angular/core';
import { EmployeeListComponent } from '../../employee-portal/employee-list/employee-list.component';
import { EditMedicalModalComponent } from '../../modal-form/edit-medical-modal/edit-medical-modal.component';
import { ActionButtonComponentRenderer } from '../../shared/action-button-renderer/action-button.component.renderer';
import { EmployeeMedicalDetailsComponent } from '../../employee-portal/employee-medical-details/employee-medical.component.details';
import { SharedModule } from '../../shared-components/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { AddEmployeeModalComponent } from '../../modal-form/add-employee-modal/add-employee-modal.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeModalComponent,
    EditMedicalModalComponent,
    ActionButtonComponentRenderer,
    EmployeeMedicalDetailsComponent,
    ErrorMessageComponent,
  ],
  imports: [SharedModule, AgGridModule],
})
export class EmployeeModule {}
