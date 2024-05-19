import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component'),
  },
  {
    path: 'register',
    title: 'Registro',
    loadComponent: () => import('./features/register/register.component'),
  },
  {
    path: 'createWatch',
    title: 'CrearReloj',
    loadComponent: () =>
      import('./features/create-watch/create-watch.component'),
  },
  {
    path: 'watchs',
    title: 'Catalogo',
    loadComponent: () => import('./features/watchs/watchs.component'),
  },
  {
    path: 'detailsWatch/:id',
    title: 'Detalles',
    loadComponent: () => import('./features/card/card.component'),
  },
  {
    path: 'editar/:id',
    title: 'edit',
    loadComponent: () => import('./features/edit/edit.component'),
  },
  {
    path: 'cesta/:id',
    title: 'cesta',
    loadComponent: () => import('./features/cesta/cesta.component'),
  },
  {
    path: 'perfil',
    title: 'profile',
    loadComponent: () => import('./features/perfil/perfil.component'),
  },

  { path: '**', redirectTo: 'home' },
];
