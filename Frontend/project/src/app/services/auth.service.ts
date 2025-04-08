import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


interface LoginResponse {
  access_token: string;
  refresh_token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  register(username: string, password: string, role: string): Observable<{ message: string }> {
    const payload = { username, password, role };
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, payload);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }));
  }

  logout(): Observable<any> {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      return new Observable(observer => {
        observer.next();
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers })
      .pipe(
        tap(() => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        })
      );
  }


  public getAccessToken(): string | null {
    return this.currentUserValue?.access_token || null;
  }
}