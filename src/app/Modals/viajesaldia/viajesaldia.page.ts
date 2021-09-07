import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ModalInfoPage } from '../modal-info/modal-info.page';
//import { Carro } from "../../models/carros";
import { Carro1 } from '../../carro1';
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
 
  public cancelado = true;
  public producido;

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Carro1
   }];

   arrayordenado: any = [{
    id: "",
    data: {} as Carro1
   }];


  constructor( private modalCtrl: ModalController, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.consultarviajes();
    console.log("this.dia: " + this.dia)
  }

  consultarviajes(){
    this.cancelado = false;
    this.firestoreService.consultar("bd/"+this.dia+"/todos").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      }) 
      this.arrayordenado = this.arrayColeccionTareas.sort((a,b)=> a.data.id-b.data.id);
      console.log("EL ARRAY ES: " + this.arrayColeccionTareas)
      this.producido = this.arrayColeccionTareas.reduce(function (r, a) {
        console.log(a.data.plata) 
        return r + a.data.plata;
        }, 0);
      console.log(this.producido) 
      this.firestoreService.update("bd",this.dia,{"producido": this.producido})
    });
    }
  
    back(){
      this.modalCtrl.dismiss({
        producido: this.producido
      })
    }
  

}
