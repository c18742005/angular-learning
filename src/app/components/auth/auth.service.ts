import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable( {providedIn: 'root'} )
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private logoutTimer;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbSYiekC1OPkJkzDIySK0y_5mddUhFnE8', {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(
        responseData.email, 
        responseData.localId, 
        responseData.idToken, 
        +responseData.expiresIn
      );
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbSYiekC1OPkJkzDIySK0y_5mddUhFnE8', {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(
        responseData.email, 
        responseData.localId, 
        responseData.idToken, 
        +responseData.expiresIn
      );
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData) {
      return;
    }

    const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(user.token) {
      this.user.next(user);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);

    if(this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    this.logoutTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if(!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'A user with this email does not exist! Please create a new account.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is incorrect!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Account has been disabled! Please contact an administrator.';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
    }
    
    return throwError(() => new Error(errorMessage));
  }
}