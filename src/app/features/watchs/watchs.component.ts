import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import ListComponent from '../list/list.component';
import { AsyncPipe } from '@angular/common';
import { UsersStateService } from '../../core/services/users.state.service';

@Component({
  selector: 'app-watchs',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ListComponent, AsyncPipe],
  template: `
    <app-header />
    <section class="text-list-bloque1">
      <div class="text-frente">
        <p class="text1">Relojes - Clasicos -Elegantes</p>
        <p class="text2">Nuestros Relojes</p>
        <p class="text3">Relojes</p>
      </div>
      <div class="reloj1-list">
        <img
          src="../../../assets/img-home/list-img1.png"
          alt="img de entrada"
          width="340"
          height="180"
        />
      </div>
    </section>
    <section class="relojs-bloque2">
      @if(state.getState() | async; as state){
      <app-list [watchInfo]="state.watchs" />
      }
    </section>

    <app-footer />
  `,
  styleUrl: './watchs.component.css',
})
export default class WatchsComponent implements OnInit {
  state = inject(UsersStateService);

  ngOnInit() {
    this.state.loadWatchs();
    this.state.getState().subscribe((data) => {
      console.log(data);
    });
  }
}
