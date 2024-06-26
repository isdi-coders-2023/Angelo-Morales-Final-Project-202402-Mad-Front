import { Component, Input, OnInit, inject } from '@angular/core';
import { Watch } from '../../core/models/watchs.model';
import { UsersStateService } from '../../core/services/users.state.service';
import { User } from '../../core/models/users.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  template: ` @if (watchInfo) {
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
    }`,
  styleUrl: './details.component.css',
})
export default class DetailsComponent implements OnInit {
  state = inject(UsersStateService);

  @Input() watchInfo!: Watch;
  currenUser!: User;

  ngOnInit(): void {
    this.state.getState().subscribe((data) => {
      this.currenUser = data.currentUser as User;
    });
  }
}
