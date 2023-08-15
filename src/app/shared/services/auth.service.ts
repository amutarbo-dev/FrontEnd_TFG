import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  backUrl = environment.backUrl;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {}

  signIn(loginForm: any) {
    const { email, password } = loginForm;
    debugger;
    return this.http
      .post(`${this.backUrl}/users/login`, {
        email,
        password,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  registerUser(userForm: any) {
    const { displayName, email, password } = userForm;

    return this.http
      .post(`${this.backUrl}/users/register`, {
        displayName,
        email,
        password,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }
}
