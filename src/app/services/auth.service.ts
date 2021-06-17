import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthData, ILoginData} from '../interfases/interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  public checkToken(token: string) {
    return this.http.get(`${environment.serverUrl}/login/${token}`);
  }
}
