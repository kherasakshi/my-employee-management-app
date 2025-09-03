import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../../../../services/login-auth/loginAuth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private loginAuthService: LoginAuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
 ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.loginAuthService.isAuthenticated()) {
      return true;
    } else {
      console.warn('Access denied. Redirecting to login page.',this.loginAuthService.isAuthenticated());
      return this.router.createUrlTree(['/login']);
    }
  }
}




















































































// Listen my requirement as if i write manually on url daskboard without verification it still navigating to dashboard same with dasboard also
