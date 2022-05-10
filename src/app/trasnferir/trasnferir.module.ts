import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrasnferirPageRoutingModule } from './trasnferir-routing.module';

import { TrasnferirPage } from './trasnferir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrasnferirPageRoutingModule
  ],
  declarations: [TrasnferirPage]
})
export class TrasnferirPageModule {}
