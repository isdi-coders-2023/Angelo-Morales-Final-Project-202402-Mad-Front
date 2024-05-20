import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `<header>
    <div class="header-icons">
      <a href="">
        <img
          src="../../../../assets/lupaicon.jpeg"
          alt="icono para buscar"
          width="16"
          height="16"
        />
      </a>

      <a [routerLink]="['/login']" routerLinkActive="active">
        <img
          src="../../../../assets/cuenta-de-usuario.png"
          alt="icon para ir a login"
          width="21"
          height="21"
        />
      </a>
      <a>
        <img
          [routerLink]="['/home']"
          routerLinkActive="active"
          src="../../../../assets/angelologo.png"
          alt="logo angelo"
          width="201"
        />
      </a>
      <a href="">
        <img
          src="../../../../assets/bolsa compra.jpeg"
          alt="bolsa de compra"
          width="17"
          height="17"
        />
      </a>
      <div class="header">
        <button class="menu-hamburguesa" (click)="toggleMenu()">
          <img
            src="../../../../assets/menu.burguer2.jpeg"
            alt="burguer icon"
            width="17"
            height="17"
          />
        </button>
      </div>
      <div class="dropdown-menu" [class.show]="isMenuOpen">
        <a [routerLink]="['/watchs']">Relojes</a>
        <a [routerLink]="['/createWatch']">Crear Reloj</a>
        <a [routerLink]="['/perfil']">Perfil</a>
        <a [routerLink]="['/home']">Home</a>
      </div>
    </div>
  </header> `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
