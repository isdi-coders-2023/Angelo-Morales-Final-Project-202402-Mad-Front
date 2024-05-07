import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RepoUsersService } from './repo.users.service';
import { environment } from '../../../../src/environments/environment.development';
import {
  UserCreateDto,
  UserLogin,
} from '../../../app/core/models/users.models';

describe('RepoUsersService', () => {
  let service: RepoUsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoUsersService],
    });
    service = TestBed.inject(RepoUsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request to the correct endpoint', () => {
    const testData: UserLogin = {
      email: 'test@example.com',
      password: 'password',
    };
    const expectedUrl = `${environment.API_URL}/users/login`;

    service.login(testData).subscribe();

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    req.flush({ token: 'mockToken' });
  });

  it('should send getById request to the correct endpoint', () => {
    const userId = '123';
    const expectedUrl = `${environment.API_URL}/users/${userId}`;

    service.getById(userId).subscribe();

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should send createUser request to the correct endpoint', () => {
    const testData: UserCreateDto = {
      name: 'Test User',
      lastName: 'Test LastName',
      email: 'test@example.com',
      password: 'password',
    };
    const expectedUrl = `${environment.API_URL}/users/register`;

    service.createUser(testData).subscribe();

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    req.flush({});
  });
});
