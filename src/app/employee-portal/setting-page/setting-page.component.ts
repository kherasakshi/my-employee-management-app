import { Component, OnInit, OnDestroy, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme-service/theme.service';
import { MatSelectChange } from '@angular/material/select';
import { NotificationService } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css'],
  standalone: false,
})
export class SettingPageComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  selectedLanguage:string = 'en';
  notificationsEnabled = false;

  constructor(
    private translate: TranslateService, private themeService: ThemeService, private notificationService:NotificationService)
  {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.selectedLanguage = savedLang;
    this.translate.use(savedLang);
  }

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('lang') || 'en';
    this.notificationsEnabled = localStorage.getItem('hrNotify') === 'true';
    this.isDarkMode = this.themeService.isDark();
  }


  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDark();
  }

  switchLanguage(event: MatSelectChange) {
    const lang =  event.value
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLanguage = lang;
  }

  updateNotificationSettings(enable:boolean) {
    this.notificationsEnabled = enable;
    localStorage.setItem('hrNotify', String(enable));
    if (enable) {
      this.notificationService.requestNotificationPermission();
    }
  }
  ngOnDestroy(): void { }
  
}
