import { NgModule } from '@angular/core';
import { MainNavbarComponent } from './main-navbar.component';
import { SharedModule } from '../../shared-components/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [MainNavbarComponent],
  imports: [SharedModule , RouterModule],
})
export class AuthModule {}
