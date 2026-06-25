import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface IfscData {
  BANK: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  DISTRICT: string;
  STATE: string;
  IFSC: string;
}

@Injectable({ providedIn: 'root' })
export class IfscService {
  private readonly http = inject(HttpClient);

  lookup(ifsc: string): Observable<IfscData | null> {
    const code = ifsc.trim().toUpperCase();
    if (code.length !== 11) return of(null);
    return this.http
      .get<IfscData>(`https://ifsc.razorpay.com/${code}`)
      .pipe(catchError(() => of(null)));
  }
}
