import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import RegisterComponent from './register.component';
import { RepoUsersService } from '../../core/services/repo.users.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let repoUsersService: jasmine.SpyObj<RepoUsersService>;

  beforeEach(async () => {
    const spyRepoUsersService = jasmine.createSpyObj('RepoUsersService', [
      'createUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: RepoUsersService, useValue: spyRepoUsersService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    repoUsersService = TestBed.inject(
      RepoUsersService
    ) as jasmine.SpyObj<RepoUsersService>; // Castear a jasmine.SpyObj

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call repoUsersService.createUser() with correct user data on form submit', () => {
    // Arrange
    const testUserData = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };
    component.registerForm.setValue(testUserData);

    repoUsersService.createUser.and.returnValue(of(testUserData));

    component.onSubmit();

    expect(repoUsersService.createUser).toHaveBeenCalledWith(testUserData);
  });
});
