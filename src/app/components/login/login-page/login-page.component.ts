import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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

  constructor() {
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

  public onLogin() {

  }

}
