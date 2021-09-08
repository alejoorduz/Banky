import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ModalInfoPage } from '../modal-info/modal-info.page';
//import { Carro } from "../../models/carros";

import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../../firestore.service';
import { IonicModule } from '@ionic/angular';
import { ActiveCarModalPage } from '../active-car-modal/active-car-modal.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  statusMessage: string;
  public cancelado = true;
  public producido;

  @Input() nombre;
  @Input() resumen; 
  @Input() costo;
  @Input() unidad;
  @Input() categoria; 
  @Input() observaciones;
  


  constructor( private modalCtrl: ModalController, private firestoreService: FirestoreService) { }
  

  ngOnInit() {
   // this.consultarviajes();
  }



  back(){
    this.modalCtrl.dismiss({
      producido: this.producido
    })
  }

}
