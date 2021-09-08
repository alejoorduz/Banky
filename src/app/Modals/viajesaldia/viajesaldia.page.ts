import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ModalInfoPage } from '../modal-info/modal-info.page';
//import { Carro } from "../../models/carros";

import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../../firestore.service';
import { IonicModule } from '@ionic/angular';
import { ActiveCarModalPage } from '../active-car-modal/active-car-modal.page';

@Component({
  selector: 'app-viajesaldia',
  templateUrl: './viajesaldia.page.html',
  styleUrls: ['./viajesaldia.page.scss'],
})
export class ViajesaldiaPage implements OnInit {

  @Input() dia; 
  @Input() viajenum;
 


  constructor( private modalCtrl: ModalController, private firestoreService: FirestoreService) { }

  ngOnInit() {
    
    console.log("this.dia: " + this.dia)
  }

 
  

}
