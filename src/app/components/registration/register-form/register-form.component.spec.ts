import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterFormComponent} from './register-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let spyAddUser;
  let authService;
  let httpClientSpy: { get: jasmine.Spy };
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      declarations: [RegisterFormComponent],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: router
        },
        TranslateService
      ]
    })
      .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(httpClientSpy as any);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    spyAddUser = spyOn(authService, 'addNewUser');
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.email.valid).toBeFalsy();
    expect(component.name.valid).toBeFalsy();
    expect(component.password.valid).toBeFalsy();
  });

  it('form validity', () => {
    let errors = {};
    const email = component.email;
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    errors = email.errors || {};
    // tslint:disable
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeFalsy();
    // tslint:enable

    email.setValue('test@test.com');
    errors = email.errors || {};
    // tslint:disable
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeUndefined();
    // tslint:enable

    const password = component.password;
    expect(password.valid).toBeFalsy();

    password.setValue('123');
    errors = email.errors || {};
    // tslint:disable
    expect(errors['required']).toBeUndefined();
    expect(errors['minlength']).toBeFalsy();
    // tslint:enable

    password.setValue('12345678900000');
    errors = email.errors || {};
    // tslint:disable
    expect(errors['required']).toBeUndefined();
    expect(errors['maxlength']).toBeFalsy();
    // tslint:enable

    password.setValue('12345qwe');
    errors = password.errors || {};
    // tslint:disable
    expect(errors['required']).toBeUndefined();
    expect(errors['maxlength']).toBeUndefined();
    expect(errors['minlength']).toBeUndefined();
    // tslint:enable
  });
});
