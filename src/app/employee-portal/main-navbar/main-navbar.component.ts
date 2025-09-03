import { Component, HostListener, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth/loginAuth.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
  standalone: false,
})
export class MainNavbarComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  isSidebarOpen: boolean = true;
  isLargeScreen: boolean = true;
  constructor(
    public translate: TranslateService,
    private loginService: LoginAuthService,
    private router: Router
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isLargeScreen = window.innerWidth >= 768;
    if (this.isLargeScreen) {
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebarOnMobile(): void {
    if (!this.isLargeScreen) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }

  onLogOut() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }




  
  onBackdropClicked(): void {
    if (!this.isLargeScreen && this.isSidebarOpen) {
      this.isSidebarOpen = false;
      if (this.drawer) {
        this.drawer.close();
      }
    }
  }

  ngOnDestroy(): void {}
}


