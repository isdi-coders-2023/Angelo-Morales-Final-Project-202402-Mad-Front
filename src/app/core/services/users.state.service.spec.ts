import { TestBed } from '@angular/core/testing';
import { UsersStateService } from './users.state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RepoUsersService } from './repo.users.service';
import { Observable } from 'rxjs';

describe('StateService', () => {
  let stateService: UsersStateService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repoUsersService: jasmine.SpyObj<RepoUsersService>;

  beforeEach(() => {
    const repoSpy = jasmine.createSpyObj('RepoUsersService', [
      'login',
      'getById',
      'create',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RepoUsersService,
        { provide: RepoUsersService, useValue: repoSpy },
      ],
    });

    stateService = TestBed.inject(UsersStateService);
    repoUsersService = TestBed.inject(
      RepoUsersService
    ) as jasmine.SpyObj<RepoUsersService>;
  });

  it('should be created', () => {
    expect(stateService).toBeTruthy();
  });

  it('should call setLogin with stored token from localStorage', () => {
    const storedToken = 'mockStoredToken';
    localStorage.setItem('TFD', storedToken);
    const setLoginSpy = spyOn(stateService, 'setLogin').and.callThrough();

    stateService.setLogin(storedToken);

    expect(setLoginSpy).toHaveBeenCalledWith(storedToken);
  });

  it('should set logout', () => {
    spyOn(localStorage, 'removeItem');

    stateService.setLogout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('TFD');
    expect(stateService.state.loginState).toEqual('idle');
    expect(stateService.state.token).toBeNull();
    expect(stateService.state.currentPayload).toBeNull();
    expect(stateService.state.currentUser).toBeNull();
  });

  it('should return user state observable', () => {
    const userState$ = stateService.getState();
    expect(userState$).toEqual(jasmine.any(Observable));
  });
});
