import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      if (localStorage.getItem('token')) {
        this.authService.checkToken(localStorage.getItem('token'))
          .subscribe(
            (res) => {
              resolve(true);
            },
            (error) => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              resolve(false);
              return this.router.navigate(['/login']).catch(err => console.error({err}));
            }
          );
      } else {
        resolve(false);
        return this.router.navigate(['/login']).catch(err => console.error({err}));
      }
    });
  }
}
