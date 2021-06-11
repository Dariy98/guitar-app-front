import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthData, IUser} from '../interfases/interfaces';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(undefined);

  constructor(
    private http: HttpClient
  ) {
  }

  public addNewUser(userData: IAuthData) {
    console.log('userData', userData);
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
}
