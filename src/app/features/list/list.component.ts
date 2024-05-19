import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

import DetailsComponent from '../details/details.component';
import { Watch } from '../../core/models/watchs.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DetailsComponent, RouterLink],
  template: `
    <div class="listWatchs">
      <ul class="watch-list">
        @for (watch of watchInfo; track $index) {
        <li><app-details [watchInfo]="watch" /></li>
        }
      </ul>
      <div class="btn-crear-reloj">
        <button
          [routerLink]="['/createWatch']"
          routerLinkActive="router-link-active"
        >
          Crear nuevo Reloj
        </button>
      </div>
    </div>
  `,
  styleUrl: './list.component.css',
})
export default class ListComponent {
  @Input() watchInfo!: Watch[];

  constructor() {
    console.log(this.watchInfo);
  }
}
