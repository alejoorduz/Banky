import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveCarModalPage } from './active-car-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveCarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveCarModalPageRoutingModule {}
