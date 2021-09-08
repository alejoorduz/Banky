import { Component,NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController,AlertController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { MenuController } from '@ionic/angular';
import { IonSelect } from '@ionic/angular';
import { ViewChild } from '@angular/core'
import { Carro } from "../models/carros";
import { ModalInfoPage } from '../Modals/modal-info/modal-info.page';
import { ModalController } from "@ionic/angular";
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Observable } from 'rxjs';

import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';


const AIRCALL_SERVICE = '';
//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

 
 
  

  constructor(
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private alertCtrl: AlertController,
    public  router: Router,
    public  storage:Storage,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private fdb: AngularFirestore,
    private firestoreService: FirestoreService,
    ) {
    }

    ngOnInit() {  
      
    }
  

    async abrirmodal(id,uuid,marca,color,viajes,tiempo,producido,out,encurso,idviaje,dia){
      const modal = await this.modalCtrl.create({
        component: ModalInfoPage,
        cssClass: 'mymodal',
        componentProps: {
          uuid : uuid,
          id: id,
          marca: marca,
          color: color,
          viajes: viajes,
          tiempo: tiempo,
          producido: producido,
          out: out,
          encurso: encurso,
          idviaje: idviaje,
          dia: dia
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        const carro = data['data']; // Here's your selected user!
        console.log("informacion carro: " + JSON.stringify(carro));
      //  var id = carro.id;
       // var viajes = carro.viajes;
        console.log("id: " + id);
        console.log("viajes: " + viajes);
        //this.clicBotonModificar(carro,id);
    });
      return await modal.present();
    }

   

  

  ionViewDidEnter() {
    //console.log('ionViewDidEnter');
    //this.Scan();
    //this.Connect();
    
    //this.className = 'clase1';
  }

  refreshpageconnection(){
    this.ionViewDidEnter();
    
  }



  togglemenu(){
    this.menu.toggle();
  }

 
  // If location permission is denied, you'll end up here


 

  // on selecting the device, you will be redirected to next page, with details of the device selected
  deviceSelected(device: any) {
    console.log(JSON.stringify(device) + ' selected');
    let navigationExtras: NavigationExtras = {
      queryParams: {
          special: JSON.stringify(device)
      }
  };
  this.router.navigate(['details'], navigationExtras);
  }

 
  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
