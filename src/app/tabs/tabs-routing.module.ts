import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        children: [
          {
            path: '',
            loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
          }
        ]
      },
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () => import('../demanda/demanda.module').then( m => m.DemandaPageModule)
          }
        ]
      },
      // {
      //   path: 'profile',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      //     }
      //   ]
      // },
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
export class TabsPageRoutingModule {}
