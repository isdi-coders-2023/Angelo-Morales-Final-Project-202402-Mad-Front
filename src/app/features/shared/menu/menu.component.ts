import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuOption } from '../../../core/models/menu-option';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <ul>
        @for (item of items; track $index) {
        <li>
          <a [routerLink]="'/' + item.path" routerLinkActive="active">{{
            item.title
          }}</a>
        </li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './menu.component.css',
})
export default class MenuComponent {
  @Input({
    required: true,
  })
  items: MenuOption[] = [];
}
