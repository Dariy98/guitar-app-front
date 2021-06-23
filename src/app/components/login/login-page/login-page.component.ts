import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {IAuthResponse} from '../../../interfases/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public mail = new FormControl('',
    [Validators.required, Validators.email]
  );
  public password = new FormControl('',
    [Validators.required, Validators.minLength(4), Validators.maxLength(10)]
  );
  public error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
  }

  public getMailError(): string {
    if (this.mail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.mail.hasError('email') ? 'Not a valid email' : '';
  }

  public getPasswordError(): string {
    if (this.password.hasError('required')) {
      return 'You must enter your password!';
    }
    return '';
  }

  public async onLogin() {
    await this.authService.checkUserInDB({
      email: this.mail.value,
      password: this.password.value,
    }).subscribe(
      (res: HttpResponse<IAuthResponse>) => {
        // console.log('res', res);
        localStorage.setItem('token', res.body.access_token);
        localStorage.setItem('user', JSON.stringify(res.body.user));
        this.error = '';
        return this.router.navigate(['/home']).catch(err => console.error({err}));
      },
      (error) => {
        this.error = error.error;
      }
    );
  }

}
