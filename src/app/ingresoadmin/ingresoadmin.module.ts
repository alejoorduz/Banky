import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoadminPageRoutingModule } from './ingresoadmin-routing.module';

import { IngresoadminPage } from './ingresoadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoadminPageRoutingModule
  ],
  declarations: [IngresoadminPage],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class IngresoadminPageModule {}
