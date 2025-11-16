import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User, AuthResponse, LoginRequest } from '../../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private baseUrl = 'https://localhost:44332/api';

  private currentUserSubject!: BehaviorSubject<User | null>;

  public currentUser!: Observable<User | null>; 

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');

    if (storedUser) {
      this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  login(userLoginData: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/Auth/login`, userLoginData).pipe(
      tap(response => {
        // Store token and user data
        if (response.token) {
          localStorage.setItem('authToken', response.token);

          if (response.user) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user); 
          }
        }
      })
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
