import { Component, Input, OnInit, inject } from '@angular/core';
import { Watch } from '../../core/models/watchs.model';
import { UsersStateService } from '../../core/services/users.state.service';
import { User } from '../../core/models/users.models';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  template: ` @if (watchInfo) {
    <article class="WatchCard">
      <ul>
        <li>
          <ul>
            <img
              src="{{
                this.state.constructImageUrl(watchInfo.image, '200', '200')
              }}"
              alt="imagenReloj"
            />
            <div class="relojesLista">
              <p class="textNuevo">Nuevo</p>
              <li class="textBrand">
                {{ watchInfo.brand + ' ' + watchInfo.model }}
              </li>
              <li>{{ watchInfo.size }}</li>
              <li class="textPrice">{{ watchInfo.price + '$' }}</li>
            </div>
          </ul>
        </li>
      </ul>
    </article>
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
