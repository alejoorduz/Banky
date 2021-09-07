import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalPageRoutingModule } from '../modal/modal-routing.module';
import { ModalPage } from '../modal/modal.page';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';
import { DesactivatePageRoutingModule } from './desactivate-routing.module';
import { DesactivatePage } from './desactivate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesactivatePageRoutingModule
  ],
  declarations: [DesactivatePage],
  schemas: [
   NO_ERRORS_SCHEMA
 ]
})
export class DesactivatePageModule {}
