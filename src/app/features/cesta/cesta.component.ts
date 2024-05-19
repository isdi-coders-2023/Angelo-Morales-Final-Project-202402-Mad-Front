import { Component, Input, OnInit, inject } from '@angular/core';
import { UsersStateService } from '../../core/services/users.state.service';
import { Watch } from '../../core/models/watchs.model';
import { RouterLink } from '@angular/router';
import { User } from '../../core/models/users.models';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterLink],
  template: `
    <app-header />
    <p>Cesta</p>
    @if (watchInfo) {
    <div class="WatchCard" [routerLink]="['/detailsWatch', watchInfo.id]">
      <img
        src="{{ this.state.constructImageUrl(watchInfo.image, '130', '180') }}"
        alt="imagenReloj"
      />
      <div class="relojesLista">
        <p class="textNuevo">Nuevo</p>
        <span class="textBrand">
          {{ watchInfo.brand + ' ' + watchInfo.model }}
        </span>
        <span>{{ watchInfo.size }}</span>
        <span class="textPrice">{{ watchInfo.price + '$' }}</span>
      </div>
    </div>
    }
    <app-footer />
  `,
  styleUrl: './cesta.component.css',
})
export default class CestaComponent implements OnInit {
  state = inject(UsersStateService);

  @Input() watchInfo!: Watch;
  currenUser!: User;

  ngOnInit(): void {
    this.state.getState().subscribe((data) => {
      this.currenUser = data.currentUser as User;
    });
  }
}
