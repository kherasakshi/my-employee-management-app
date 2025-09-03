import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginAuthService {
  private TOKEN_KEY = 'jwt_token';
  private readonly MOCK_JWT_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiU2Frc2hpIEtoZXJhIiwiaWF0IjoxNjk4MDAwMDAsImV4cCI6Mjg0Njc3NzIwMH0.' +
    '4aYzFFgz_MvBnBC03U1uT9UAn12HkjK9USMXJvG6G78';

  
  login(email: string, password: string): boolean {
    if (email === 'sak123@gmail.com' && password === 'sak456') {
      localStorage.setItem(this.TOKEN_KEY, this.MOCK_JWT_TOKEN);
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }


  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}




