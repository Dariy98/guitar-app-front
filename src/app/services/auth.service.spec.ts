import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  const mockSomeService = {
    addNewUser: () => {
      return {
        subscribe: () => {
        }
      };
    },
    checkUserInDB: () => {
      return {
        subscribe: () => {
        }
      };
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: mockSomeService}
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addNewUser should send request and return user\'s data', () => {
    const mockUserRes = {
      email: 'test@test.com',
      name: 'mockName',
      password: null,
      id: '1'
    };
    spyOn(mockSomeService, 'addNewUser').and.returnValue(of(mockUserRes));
  });

  it('checkUserInDB should send user and if ok - return it', () => {
    const mockUserRes = {
      email: 'test@test.com',
      name: 'mockName',
      password: null,
      id: '1'
    };
    spyOn(mockSomeService, 'checkUserInDB').and.returnValue(of(mockUserRes));
  });
});
