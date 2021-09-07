import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalInfoPageRoutingModule } from './modal-info-routing.module';
import { ModalInfoPage } from './modal-info.page';
import { ActiveCarModalPage } from '../active-car-modal/active-car-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoPageRoutingModule
  ],
  declarations: [ModalInfoPage],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ModalInfoPageModule {}
