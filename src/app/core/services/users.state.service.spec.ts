import { TestBed } from '@angular/core/testing';
import {
  UsersStateService,
  State,
  LoginState,
  Payload,
} from './users.state.service';
import { RepoUsersService } from './repo.users.service';
import { of } from 'rxjs';
import { User } from '../models/users.models';
describe('StateService', () => {
  let service: UsersStateService;
  let mockRepoUsersService: jasmine.SpyObj<RepoUsersService>;

  beforeEach(() => {
    const repoSpy = jasmine.createSpyObj('RepoUsersService', {
      getById: of({} as User),
    });
    TestBed.configureTestingModule({
      providers: [
        UsersStateService,
        { provide: RepoUsersService, useValue: repoSpy },
      ],
    });
    service = TestBed.inject(UsersStateService);
    mockRepoUsersService = TestBed.inject(
      RepoUsersService
    ) as jasmine.SpyObj<RepoUsersService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setLogin with stored token from localStorage', () => {
    const storedToken = 'mockStoredToken';
    localStorage.setItem('frontend', storedToken);
    spyOn(service, 'jwtDecode').and.returnValue({} as Payload);
    const setLoginSpy = spyOn(service, 'setLogin').and.callThrough();

    service.setLogin(storedToken);

    expect(setLoginSpy).toHaveBeenCalledWith(storedToken);
  });
  describe('setLoginState', () => {
    it('should set login state correctly', () => {
      const newState: LoginState = 'logged';
      service.setLoginState(newState);
      const state = service.state;

      expect(state.loginState).toEqual(newState);
    });
  });

  describe('setLogin', () => {
    it('should set login state to logged and set token, payload, and current user', () => {
      const payload = {
        id: 'mockId',
        exp: 1234567890,
        email: 'angelo@log',
        role: 'user',
      };
      spyOn(service, 'jwtDecode').and.returnValue(payload);
      const mockUser = {
        id: 'mockId',
        name: 'John Doe',
        email: 'angelo@test',
        lastName: 'lastName',
      };
      spyOn(localStorage, 'setItem');

      mockRepoUsersService.getById.and.returnValue(of(mockUser));
      service.setLogin('token');

      service.getState().subscribe((state: State) => {
        expect(state.loginState).toEqual('logged');
        expect(state.token).toEqual('token');
        expect(state.currentPayload).toEqual(payload);
        expect(state.currentUser).toEqual(mockUser);
        expect(localStorage.setItem).toHaveBeenCalledWith('frontend', 'token');
      });
    });
  });

  describe('setLogout', () => {
    it('should reset state and remove token from local storage', () => {
      spyOn(localStorage, 'removeItem');
      service.setLogout();

      service.getState().subscribe((state: State) => {
        expect(state.loginState).toEqual('idle');
        expect(state.token).toBeNull();
        expect(state.currentPayload).toBeNull();
        expect(localStorage.removeItem).toHaveBeenCalledWith('frontend');
      });
    });
  });
});
