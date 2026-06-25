import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

type AuthTab = 'login' | 'register' | 'forgot';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  activeTab = signal<AuthTab>('login');
  loading = signal(false);
  errorMsg = signal('');
  successMsg = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  // Login
  loginForm = { userName: '', password: '' };

  // Register
  registerForm = {
    companyName: '',
    userName: '',
    emailId: '',
    password: '',
    confirmPassword: '',
  };

  // Forgot password
  forgotForm = {
    emailId: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  setTab(tab: AuthTab): void {
    this.activeTab.set(tab);
    this.errorMsg.set('');
    this.successMsg.set('');
  }

  onLogin(): void {
    this.errorMsg.set('');
    if (!this.loginForm.userName || !this.loginForm.password) {
      this.errorMsg.set('Username and password are required.');
      return;
    }
    this.loading.set(true);
    this.auth.login(this.loginForm).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? err.error?.title ?? 'Invalid credentials. Please try again.');
      },
    });
  }

  onRegister(): void {
    this.errorMsg.set('');
    const f = this.registerForm;
    if (!f.companyName || !f.userName || !f.emailId || !f.password) {
      this.errorMsg.set('All fields are required.');
      return;
    }
    if (f.password !== f.confirmPassword) {
      this.errorMsg.set('Passwords do not match.');
      return;
    }
    if (f.password.length < 6) {
      this.errorMsg.set('Password must be at least 6 characters.');
      return;
    }
    this.loading.set(true);
    this.auth.register(f).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMsg.set('Registration successful! You can now log in.');
        this.setTab('login');
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? err.error?.title ?? 'Registration failed. Please try again.');
      },
    });
  }

  onForgotPassword(): void {
    this.errorMsg.set('');
    const f = this.forgotForm;
    if (!f.emailId || !f.newPassword || !f.confirmNewPassword) {
      this.errorMsg.set('All fields are required.');
      return;
    }
    if (f.newPassword !== f.confirmNewPassword) {
      this.errorMsg.set('Passwords do not match.');
      return;
    }
    this.loading.set(true);
    this.auth.forgotPassword(f).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.successMsg.set(res.message ?? 'Password reset successfully.');
        this.setTab('login');
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? err.error?.title ?? 'Password reset failed. Check your email.');
      },
    });
  }
}
