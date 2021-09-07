import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesaldiaPage } from './viajesaldia.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesaldiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesaldiaPageRoutingModule {}
