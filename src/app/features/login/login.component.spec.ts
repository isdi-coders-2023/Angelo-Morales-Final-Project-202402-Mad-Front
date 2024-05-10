import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import LoginComponent from './login.component';
import { RepoUsersService } from '../../core/services/repo.users.service';
import { UsersStateService } from '../../core/services/users.state.service';
import { UserCreateDto } from '../../core/models/users.models';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let repoUsersService: RepoUsersService;
  let usersStateService: UsersStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [RepoUsersService, UsersStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    repoUsersService = TestBed.inject(RepoUsersService);
    usersStateService = TestBed.inject(UsersStateService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit login form and login successfully', () => {
    const mockUserLogin: UserCreateDto = {
      email: 'test',
      password: 'testpassword',
    } as UserCreateDto;
    spyOn(repoUsersService, 'login').and.returnValue(
      of({ token: 'mockToken' })
    );
    spyOn(usersStateService, 'setLogin');

    component.formLogin.setValue({
      email: mockUserLogin.email,
      password: mockUserLogin.password,
    });
    component.submit();

    expect(repoUsersService.login).toHaveBeenCalledWith(mockUserLogin);
    expect(usersStateService.setLogin).toHaveBeenCalledWith('mockToken');
  });

  it('should submit login form and handle login error', () => {
    const mockUserLogin: UserCreateDto = {
      email: 'test',
      password: 'testpassword',
    } as UserCreateDto;
    spyOn(repoUsersService, 'login').and.returnValue(
      throwError(() => 'Login failed')
    );
    spyOn(usersStateService, 'setLoginState');

    component.formLogin.setValue({
      email: mockUserLogin.email,
      password: mockUserLogin.password,
    });
    component.submit();

    expect(repoUsersService.login).toHaveBeenCalledWith(mockUserLogin);
    expect(usersStateService.setLoginState).toHaveBeenCalledWith('error');
  });
  // it('should set userLogin email if name includes "@"', () => {
  //   // Simular un valor de email con '@'
  //   component.formLogin.patchValue({ email: 'test@example.com' });

  //   // Llamar al método submit() del componente
  //   component.submit();

  //   // Verificar que userLogin se construyó correctamente con el email
  //   expect(component.).toEqual('test@example.com');
  // });
});
