import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-components/shared.module';
import { SettingPageComponent } from './setting-page.component';

@NgModule({
  declarations: [SettingPageComponent],
  imports: [SharedModule],
})
export class SettingsModule {}
