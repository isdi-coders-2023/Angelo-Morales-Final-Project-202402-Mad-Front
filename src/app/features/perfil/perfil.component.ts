import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersStateService } from '../../core/services/users.state.service';
import { User } from '../../core/models/users.models';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: ` <app-header />
    <main>
      <div
        *ngIf="user$ | async as user; else loading"
        class="profile-container"
      >
        <h2>Hola {{ user.name }}</h2>
        <p><strong>Nombre:</strong> {{ user.name }}</p>
        <p><strong>Apellido:</strong> {{ user.lastName }}</p>
        <p><strong>Correo Electrónico:</strong> {{ user.email }}</p>
      </div>
      <ng-template #loading>
        <div class="loading">
          <p>Cargando perfil...</p>
        </div>
      </ng-template>
    </main>
    <app-footer />`,
  styleUrls: ['./perfil.component.css'],
})
export default class PerfilComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private state: UsersStateService) {
    this.user$ = this.state.getState().pipe(map((state) => state.currentUser));
  }

  ngOnInit(): void {
    // Cargar usuario actual si no está cargado aún
    if (!this.state.state.currentUser && this.state.state.currentPayload) {
      this.state.loadCurrentUser(this.state.state.currentPayload.id);
    }
  }
}
