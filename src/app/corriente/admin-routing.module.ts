import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'inicio',
        children: [
          {
            path: '',
            loadChildren: () => import('../verificacion/inicio.module').then( m => m.InicioPageModule)
          }
        ]
      },
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () => import('../generarqr/adicionar.module').then( m => m.AdicionarPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

