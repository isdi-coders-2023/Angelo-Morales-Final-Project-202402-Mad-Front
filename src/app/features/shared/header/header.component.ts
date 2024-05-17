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
          width=" 16"
          height="16"
      /></a>

      <a [routerLink]="['/login']" routerLinkActive="active">
        <img
          src="../../../../assets/cuenta-de-usuario.png"
          alt="icon para ir a login"
          width=" 21"
          height="21"
        />
      </a>
      <a href="">
        <img
          src="../../../../assets/angelologo.png"
          alt="logo angelo"
          width=" 200"
      /></a>
      <a href="">
        <img
          src="../../../../assets/bolsa compra.jpeg"
          alt="bolsa de compra"
          width=" 17"
          height="17"
      /></a>
      <a href="">
        <img
          src="../../../../assets/menu.burguer2.jpeg"
          alt="menu burguer"
          width=" 25"
          height="35"
      /></a>
    </div>
  </header> `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Watchs Angelo';
}
