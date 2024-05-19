import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Watch } from '../../core/models/watchs.model';
import { UsersStateService } from '../../core/services/users.state.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { User } from '../../core/models/users.models';
import { WatchsRepoService } from '../../core/services/watchs.repo.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <app-header />
    @if (watch) {
    <div class="card">
      <p class="textDetalles">Detalles</p>
      <div class="block1-card">
        <img
          src="../../../../../../assets/flecha-izq.png"
          alt="flecha-izquierda"
          width="14"
          height="14"
        />
        <img
          src="{{ this.state.constructImageUrl(watch.image, '130', '180') }}"
          alt="imagenReloj"
        />
        <img
          src="../../../../../../assets/flecha.dere.png"
          alt="flecha-izquierda"
          width="14"
          height="14"
        />
      </div>
      <div class="card-detalles">
        <span class="cardBrandtext">
          {{ watch.brand + ' ' + watch.model }}
        </span>
        <hr />
        <div class="card-propiedades">
          <span>{{ watch.machine }}</span>
          <span>{{ watch.size }}</span>
          <span>{{ watch.cristal }}</span>
          <span>{{ watch.waterResist }}</span>
        </div>

        <hr />
        <div class="precio-and-text">
          <span class="textPrice">{{ watch.price + '$' }}</span>
          <p>Impuestos de ventas incluidos</p>
        </div>
        <div class="btns-crud">
          <button type="button" (click)="edictWatch(watch.id)">Editar</button>
          <button type="button" (click)="deleteWatch(watch.id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    }
    <app-footer />
  `,
  styleUrl: './card.component.css',
})
export default class CardComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  state = inject(UsersStateService);
  stateWatch = inject(WatchsRepoService);
  watch: Watch | undefined;
  currenUser!: User;

  constructor() {
    let id: string | null = null;
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      if (id) {
        this.watch = this.state.state.watchs.find((watch) => watch.id === id);
      }
    });
  }
  ngOnInit(): void {
    console.log(this.watch);
    this.state.getState().subscribe((data) => {
      this.currenUser = data.currentUser as User;
    });
  }

  edictWatch(id: string) {
    this.route.navigate(['editar', id]);
  }

  deleteWatch(id: string) {
    console.log(id);
    this.state.deleteWatchId(id);

    this.route.navigate(['home']);
  }
}
