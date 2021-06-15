import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  public email = new FormControl('',
    [Validators.required, Validators.email]
  );
  public name = new FormControl('',
    [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
  );
  public password = new FormControl('',
    [Validators.required, Validators.minLength(4), Validators.maxLength(10)]
  );

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
  }

  public getMailError(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public getNameError(): string {
    if (this.name.hasError('required')) {
      return 'You must enter your nickname!';
    }
    if (this.name.errors?.minlength) {
      return 'Your nickname cannot be shorter than 3 characters!';
    }
    if (this.name.errors?.maxlength) {
      return 'Your nickname cannot be longer than 20 characters!';
    }
    return '';
  }

  public getPasswordError(): string {
    if (this.password.hasError('required')) {
      return 'You must enter your password!';
    }
    if (this.password.errors?.minlength) {
      return 'Your password cannot be shorter than 4 characters!';
    }
    if (this.password.errors?.maxlength) {
      return 'Your password cannot be longer than 10 characters!';
    }
    return '';
  }

  public async sendData() {
    await this.authService.addNewUser({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    });

    await this.authService.user$
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/home']).catch(err => console.error({err}));
        }
      });
  }
}
