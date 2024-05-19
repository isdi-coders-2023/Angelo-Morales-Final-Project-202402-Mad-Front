import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepoUsersService } from '../../core/services/repo.users.service';
import { UsersStateService } from '../../core/services/users.state.service';
import { HeaderComponent } from '../shared/header/header.component';
import { UserLogin } from '../../core/models/users.models';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <app-header />
    <div class="form-container">
      <h2 class="inicio-sesion">Inicio de sesión</h2>
      <form [formGroup]="formLogin" (ngSubmit)="submit()">
        <div>
          <label for="user">email *</label>
          <input id="user" type="text" formControlName="email" />
        </div>
        <div>
          <label for="password">contraseña *</label>
          <input id="password" type="password" formControlName="password" />
        </div>

        <button type="submit" [disabled]="formLogin.invalid">entrar</button>

        <div class="enlaceRegister">
          <p>aun no tienes cuenta ?</p>
          <a [routerLink]="['/register']" routerLinkActive="router-link-active">
            Registrate aqui!
          </a>
        </div>
      </form>
    </div>
  `,
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, HeaderComponent, RouterLink],
})
export default class LoginComponent {
  private repo = inject(RepoUsersService);
  private state = inject(UsersStateService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  formLogin = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    const { email, password } = this.formLogin.value;
    const userLogin = { email, password } as UserLogin;

    if (userLogin.email) {
      userLogin.email = this.formLogin.value.email as string;
    }

    this.repo.login(userLogin).subscribe({
      next: ({ token }) => {
        this.state.setLogin(token);
        console.log('Logged in', token);
      },
      error: (err) => {
        console.error(err);
        this.state.setLoginState('error');
      },
    });

    this.router.navigate(['/home']);
  }
}
