import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-components/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeBieChartsComponent } from './employee-bie-charts.component';

@NgModule({
  declarations: [EmployeeBieChartsComponent],
  imports: [SharedModule, NgChartsModule],
})
export class ChartsModule {}
