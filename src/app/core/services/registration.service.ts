import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse  } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'https://localhost:44332/api/Auth';

  register(userRegistrationData: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${this.baseUrl}/register`, userRegistrationData)
      .pipe(tap(response => {
        console.log('Registration successful:', response);
        return response;
        // You can also trigger a success message, redirect, etc.
      }),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => error);
        })
      );
  }
}
