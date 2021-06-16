import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPageComponent} from './login-page.component';
import {AuthService} from '../../../services/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [AuthService,
        {
          provide: Router,
          useValue: router
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
