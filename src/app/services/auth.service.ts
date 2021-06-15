import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IAuthData, ILoginData, IUser} from '../interfases/interfaces';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(undefined);
  public error$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient
  ) {
  }

  public addNewUser(userData: IAuthData) {
    this.http.post(`${environment.serverUrl}/register`, userData)
      .subscribe((res: IAuthData) => {
        if (res) {
          return this.user$.next({
            name: res.name,
            email: res.email,
          });
        }
        return this.user$.next(null);
      });
  }

  public checkUserInDB(loginData: ILoginData) {
    this.http.post(`${environment.serverUrl}/login`, loginData, {
      observe: 'response',
    }).subscribe(
        (res: HttpResponse<IUser>) => {
          this.error$.next('');
          return this.user$.next(res.body);
        },
        (error) => {
          this.user$.next(null);
          return this.error$.next(error.error);
        }
      );
  }
}
