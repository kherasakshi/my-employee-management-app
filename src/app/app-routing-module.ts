import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavbarComponent } from './employee-portal/main-navbar/main-navbar.component';
import { EmployeeListComponent } from './employee-portal/employee-list/employee-list.component';
import { EmployeeMedicalDetailsComponent } from './employee-portal/employee-medical-details/employee-medical.component.details';
import { EmployeeBieChartsComponent } from './employee-portal/employee-bie-charts/employee-bie-charts.component';
import { SettingPageComponent } from './employee-portal/setting-page/setting-page.component';
import { PageNotFoundComponent } from './employee-portal/Page-not-found/page-not-found.component';
import { LoginComponent } from './employee-portal/auth/login/login.component';
import { AuthGuard } from './employee-portal/auth/login/auth-guard/loginAuth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main-navbar', component: MainNavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'employee-list', pathMatch: 'full' , },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'employee-medical-details', component: EmployeeMedicalDetailsComponent },
      {path: 'employee-charts', component: EmployeeBieChartsComponent},
      { path: 'settings', component: SettingPageComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

