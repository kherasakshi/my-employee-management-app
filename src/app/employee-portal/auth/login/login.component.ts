import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginAuthService } from '../../../services/login-auth/loginAuth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private loginAuthService: LoginAuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    this.isLoading = true;
    const { email , password } = this.loginForm.value;
    setTimeout(() => {
      const loginSuccess = this.loginAuthService.login(email , password)
      this.isLoading = false;
      if (loginSuccess) {
        const token = localStorage.getItem('jwt_token');
        console.log('JWT Token:', token);

        this.snackBar.open('Login successful!', 'Close', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
        this.router.navigateByUrl('/main-navbar/employee-list', { replaceUrl: true });
      } else {
        this.snackBar.open('Invalid credentials', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }, 2000);
  }
}






















