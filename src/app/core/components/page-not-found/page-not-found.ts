import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found-wrapper">
      <div class="not-found-card">
        <div class="not-found-code">404</div>
        <h1 class="not-found-title">Page Not Found</h1>
        <p class="not-found-msg">The page you are looking for doesn't exist or has been moved.</p>
        <a routerLink="/dashboard" class="btn btn-primary">Back to Dashboard</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-wrapper {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--gray-50);
      padding: 24px;
    }
    .not-found-card {
      text-align: center;
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius);
      padding: 60px 48px;
      max-width: 440px;
      width: 100%;
      box-shadow: var(--shadow-md);
    }
    .not-found-code {
      font-size: 96px;
      font-weight: 800;
      color: var(--primary);
      line-height: 1;
      margin-bottom: 16px;
      letter-spacing: -4px;
    }
    .not-found-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 12px;
    }
    .not-found-msg {
      font-size: 15px;
      color: var(--gray-500);
      margin-bottom: 32px;
      line-height: 1.6;
    }
  `],
})
export class PageNotFound {}
