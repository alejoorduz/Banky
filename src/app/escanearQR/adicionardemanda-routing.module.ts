import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionardemandaPage } from './adicionardemanda.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionardemandaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionardemandaPageRoutingModule {}
