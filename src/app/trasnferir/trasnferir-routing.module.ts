import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasnferirPage } from './trasnferir.page';

const routes: Routes = [
  {
    path: '',
    component: TrasnferirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrasnferirPageRoutingModule {}
