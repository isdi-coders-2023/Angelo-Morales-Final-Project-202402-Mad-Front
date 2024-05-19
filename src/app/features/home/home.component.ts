import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import MenuComponent from '../shared/menu/menu.component';
import { Router, RouterLink } from '@angular/router';
import { UsersStateService } from '../../core/services/users.state.service';
import { Watch } from '../../core/models/watchs.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MenuComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {
  state = inject(UsersStateService);
  router = inject(Router);
  watchs: Watch[] = [];

  constructor() {
    this.state.loadWatchs();

    this.state.getState().subscribe((data) => {
      this.watchs = data.watchs;
    });
  }
}
