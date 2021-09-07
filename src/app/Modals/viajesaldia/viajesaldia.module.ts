import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesaldiaPageRoutingModule } from './viajesaldia-routing.module';

import { ViajesaldiaPage } from './viajesaldia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesaldiaPageRoutingModule
  ],
  declarations: [ViajesaldiaPage]
})
export class ViajesaldiaPageModule {}
