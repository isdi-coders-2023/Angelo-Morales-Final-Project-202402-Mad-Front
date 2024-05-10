import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RepoUsersService } from '../../core/services/repo.users.service';
import { Router } from '@angular/router';
import { UserCreateDto } from '../../core/models/users.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  template: `
    <app-header />
    <h2 class="crear-cuenta">Crear Cuenta</h2>
    <div class="form-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-control">
          <label>
            <span>nombre *</span>
            <br />
            <input type="text" formControlName="name" />
          </label>
        </div>
        <div>
          <label>
            <span>apellido *</span>
            <br />
            <input type="text" formControlName="lastName" />
          </label>
        </div>
        <div class="form-control">
          <label>
            <span>email *</span>
            <br />
            <input type="email" formControlName="email" />
          </label>
        </div>
        <div class="form-control">
          <label>
            <span>contraseña *</span>
            <br />
            <input type="password" formControlName="password" />
          </label>
        </div>
        <button type="submit" [disabled]="registerForm.invalid">
          Registrarse
        </button>
      </form>
    </div>
  `,
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private repo = inject(RepoUsersService);
  private router = inject(Router);
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { name, lastName, password, email } = this.registerForm.value;
    const newUser = { name, lastName, password, email } as UserCreateDto;

    this.repo.createUser(newUser).subscribe({
      next: (user) => {
        console.log(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
