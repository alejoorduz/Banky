import { Component, Input, OnInit, NgZone } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { BLE } from '@ionic-native/ble/ngx';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
//import { time } from 'console';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../../firestore.service';
import { Carro1 } from '../../carro1';
import { AlertController } from '@ionic/angular';
import { ActiveCarModalPage } from '../active-car-modal/active-car-modal.page';
import { DesactivatePage } from '../../Modals/desactivate/desactivate.page';
import * as moment from 'moment';
import { identifierModuleUrl } from '@angular/compiler';
import { ObjectUnsubscribedError } from 'rxjs';
//import { parse } from 'path';

const AIRCALL_SERVICE = '';
//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________


@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  document: any = {
    id: "",
    data: {} 
  };

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Carro1
   }];

  idTareaSelec: string;

  editarcarro: Carro1;
  
  statusMessage: string;
  public cancelado = false;
  @Input() nombre;
  @Input() resumen; 
  @Input() costo;
  @Input() unidad;
  @Input() categoria; 
  @Input() observaciones;

  public tiempofinal;
  public tiempoinicial
  public horainicial;
  public minutoinicial;
  public segundoinicial;
  public horafinal;
  public minutofinal;
  public segundofinal;

 

   arrayordenado: any = [{
    id: "",
    data: {} as Carro1
   }];

  constructor( private modalCtrl: ModalController, private firestoreService: FirestoreService) { }
  

  ngOnInit() {
   // this.consultarviajes();
  }



  back(){
    this.modalCtrl.dismiss({
      
    })
  }

}
