import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthData, ILoginData, IUser} from '../interfases/interfaces';
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
    return this.http.post(`${environment.serverUrl}/register`, userData);
  }

  public checkUserInDB(loginData: ILoginData) {
    return this.http.post(`${environment.serverUrl}/login`, loginData, {observe: 'response'});
  }
}
