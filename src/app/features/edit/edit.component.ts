import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import MenuComponent from '../shared/menu/menu.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WatchsRepoService } from '../../core/services/watchs.repo.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Watch } from '../../core/models/watchs.model';
import { UsersStateService } from '../../core/services/users.state.service';

@Component({
  selector: 'app-edit-watch',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  template: `
    <app-header></app-header>
    <p class="text-create-1">Reloj</p>
    <h3 class="caracteristicas">Actualizar Reloj</h3>
    <div class="form-container">
      <form [formGroup]="editWatchForm" (ngSubmit)="onSubmit()">
        <div class="form-control-brand">
          <label>
            <span>Marca *</span>
            <br />
            <input type="text" formControlName="brand" />
          </label>
        </div>
        <div class="form-control-model">
          <label>
            <span>Modelo *</span>
            <br />
            <input type="text" formControlName="model" />
          </label>
        </div>
        <div class="form-control-size">
          <label>
            <span>Diametro</span>
            <br />
            <input type="text" formControlName="size" />
          </label>
        </div>
        <div class="form-control-cristal">
          <label>
            <span>Cristal </span>
            <br />
            <input type="text" formControlName="cristal" />
          </label>
        </div>
        <div class="form-control-waterResist">
          <label>
            <span>Resistencia al agua</span>
            <br />
            <input type="text" formControlName="waterResist" />
          </label>
        </div>
        <div class="form-control-machine">
          <label>
            <span>Calibre *</span>
            <br />
            <input type="text" formControlName="machine" />
          </label>
        </div>
        <div class="form-control-price">
          <hr />
          <label>
            <h2>Precio *</h2>
            <br />
            <input type="text" formControlName="price" />
          </label>
        </div>
        <!-- <div class="form-control-img">
          <h2>Cargar Fotos</h2>
          <hr />
          <label>
            <span>imagen *</span>
            <br />
            <input type="file" #image (change)="onFileChange()" />
          </label>
        </div> -->
        <button type="submit" [disabled]="editWatchForm.invalid">
          Actualizar
        </button>
      </form>
    </div>
    <app-footer></app-footer>
  `,
  styleUrls: ['./edit.component.css'],
})
export default class EditWatchComponent {
  @Input({
    required: true,
  })
  fb = inject(FormBuilder);
  private repo = inject(WatchsRepoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private state = inject(UsersStateService);
  editWatchForm: FormGroup;
  watch: Watch | undefined;
  watchId: string | null = null;
  @ViewChild('image') image!: ElementRef;

  constructor() {
    this.route.params.subscribe((params) => {
      console.log('dento de la subs', this.watchId);
      this.watchId = params['id'];
    });
    console.log('fuera de la subs', this.watchId);
    this.state.getState().subscribe((elements) => {
      this.watch = elements.watchs.find((album) => album.id === this.watchId);
      console.log('dentro del ssubsss', this.watch);
    });
    console.log('fuera de la subs', this.watch);

    this.editWatchForm = this.fb.group({
      brand: [this.watch?.brand, Validators.required],
      model: [this.watch?.model, Validators.required],
      price: [this.watch?.price, Validators.required],
      waterResist: [this.watch?.waterResist],
      machine: [this.watch?.machine],
      size: [this.watch?.size],
      cristal: [this.watch?.cristal],
      image: [this.watch?.image],
    });
  }

  // onFileChange() {
  //   const htmlElement: HTMLInputElement = this.image.nativeElement;
  //   const file = htmlElement.files![0];
  //   this.editWatchForm!.patchValue({ image: file });
  // }

  onSubmit() {
    console.log(this.editWatchForm.value);
    // const fd = new FormData();
    // fd.append('brand', this.editWatchForm.value.brand);
    // fd.append('model', this.editWatchForm.value.model);
    // fd.append('size', this.editWatchForm.value.size);
    // fd.append('image', this.editWatchForm.value.image);
    // fd.append('cristal', this.editWatchForm.value.cristal);
    // fd.append('waterResist', this.editWatchForm.value.waterResist);
    // fd.append('machine', this.editWatchForm.value.machine);
    // fd.append('price', this.editWatchForm.value.price);

    return this.repo
      .updateWatch(this.editWatchForm.value, this.watchId!)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/home']);
      });
  }
}
