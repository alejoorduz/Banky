import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoadminPage } from './ingresoadmin.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoadminPageRoutingModule {}
