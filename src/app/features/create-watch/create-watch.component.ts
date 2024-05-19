import { Component, ElementRef, ViewChild, inject } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { WatchCreateDto } from '../../core/models/watchs.model';

@Component({
  selector: 'app-create-watch',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  template: `<app-header />
    <p class="text-create-1">Crear Nuevo Anuncio</p>
    <h3 class="caracteristicas">Caracteristicas del Reloj</h3>
    <div class="form-container">
      <form [formGroup]="createWatchForm" (ngSubmit)="onSubmit()">
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
        <div class="form-control-img">
          <h2>Cargar Fotos</h2>
          <hr />
          <label>
            <span>imagen *</span>
            <br />
            <input type="file" #image (change)="onFileChange()" />
          </label>
        </div>
        <button type="submit">Crear Reloj</button>
      </form>
    </div>
    <app-footer /> `,
  styleUrl: './create-watch.component.css',
})
export default class CreateWatchComponent {
  private fb = inject(FormBuilder);
  private repo = inject(WatchsRepoService);
  private router = inject(Router);
  createWatchForm: FormGroup;
  @ViewChild('image') image!: ElementRef;

  constructor() {
    this.createWatchForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      waterResist: [''],
      machine: [''],
      size: [''],
      cristal: [''],
      image: [null],
    });
  }

  onFileChange() {
    const htmlElement: HTMLInputElement = this.image.nativeElement;
    const file = htmlElement.files![0];
    console.log(file);
    this.createWatchForm.patchValue({ image: file });
  }

  onSubmit() {
    console.log(this.createWatchForm.value);
    const fd = new FormData();
    fd.append('brand', this.createWatchForm.value.brand);
    fd.append('model', this.createWatchForm.value.model);
    fd.append('size', this.createWatchForm.value.size);
    fd.append('image', this.createWatchForm.value.image);
    fd.append('cristal', this.createWatchForm.value.cristal);
    fd.append('waterResist', this.createWatchForm.value.waterResist);
    fd.append('machine', this.createWatchForm.value.machine);
    fd.append('price', this.createWatchForm.value.price);

    return this.repo
      .createWatch(fd as unknown as WatchCreateDto)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['home']);
      });
  }
}
