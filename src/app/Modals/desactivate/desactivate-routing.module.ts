import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesactivatePage } from './desactivate.page';

const routes: Routes = [
  {
    path: '',
    component: DesactivatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesactivatePageRoutingModule {}
