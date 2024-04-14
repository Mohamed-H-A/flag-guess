import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public userObservable: Observable<User>;
  private localStorage;
  constructor(private http: HttpClient, private toastrService: ToastrService, @Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    this.userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
    this.userObservable = this.userSubject.asObservable();
   }

   public get currentUser(): User{
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to Guess the Flag, ${user.name}.`,
            `Login Successful`
          )
        },
        error: (errorRes) => {
          this.toastrService.error(errorRes.error.message, `Login Failed`)
        }
      })
    )
  }

  register(registeredUser: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, registeredUser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to Guess the Flag, ${user.name}.`,
            `Register Successful`
          )
        },
        error: (errorRes) => {
          this.toastrService.error(errorRes.error.message, `Register Failed`)
        }
      })
    )
  }


  logout() {
    this.userSubject.next(new User());
    if (this.localStorage) {
      localStorage.removeItem(USER_KEY);
    }
    window.location.reload();
  }

  private setUserToLocalStorage(user: User){
    if (this.localStorage) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User {
    if (this.localStorage) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) {
        return JSON.parse(userJson) as User;
      } else {
        return new User();
      }
    } else {
      return new User();
    }
  }
}
