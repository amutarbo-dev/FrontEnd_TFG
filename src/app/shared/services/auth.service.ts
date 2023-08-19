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
    private http: HttpClient,
    private firebase: AngularFireAuth
  ) {}

  async signIn(loginForm: any) {
    const { email, password } = loginForm;
    return await this.firebase.signInWithEmailAndPassword(email, password);
  }

  registerUser(userForm: any) {
    const { email, password } = userForm;
    return this.firebase.createUserWithEmailAndPassword(email, password);
  }

  addInfoRegisteredUser(displayName: string) {
    return this.http
      .post(`${this.backUrl}/users/register`, {
        displayName,
      })
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  getInfo() {
    return this.http
      .get(`${this.backUrl}/users/getUser`)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  editProfile(body: any) {
    return this.http
      .patch(`${this.backUrl}/users/editProfile`, {
        ...body,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  getFavorites() {
    const urlProducts = `${this.backUrl}/users/favorites`;
    return this.http
      .get<any>(urlProducts)
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
