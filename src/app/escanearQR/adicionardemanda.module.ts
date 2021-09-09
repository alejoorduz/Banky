import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionardemandaPageRoutingModule } from './adicionardemanda-routing.module';

import { AdicionardemandaPage } from './adicionardemanda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionardemandaPageRoutingModule
  ],
  declarations: [AdicionardemandaPage]
})
export class AdicionardemandaPageModule {}
