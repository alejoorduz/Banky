import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'ingresoadmin',
    loadChildren: () => import('./iniciosesion/ingresoadmin.module').then( m => m.IngresoadminPageModule)
  },
  {
    path: '',
    redirectTo: 'ingresoadmin',
    pathMatch: 'full'
  },
  {
    path: 'details',
    loadChildren: () => import('./recuperacion/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./verificacion/inicio.module').then( m => m.InicioPageModule)
  },
   {
    path: 'admin',
    loadChildren: () => import('./corriente/admin.module').then( m => m.AdminPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'adicionar',
    loadChildren: () => import('./generarQR/adicionar.module').then( m => m.AdicionarPageModule)
  },
   {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
     canActivate:[AuthGuard],
  },
  {
    path: 'demanda',
    loadChildren: () => import('./ahorros/demanda.module').then( m => m.DemandaPageModule)
  },
  {
    path: 'adicionardemanda',
    loadChildren: () => import('./escanearQR/adicionardemanda.module').then( m => m.AdicionardemandaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
