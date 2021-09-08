import { Component,NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController,AlertController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { MenuController } from '@ionic/angular';
import { IonSelect } from '@ionic/angular';
import { ViewChild } from '@angular/core'
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
   

  ionViewDidEnter() {
  }

  refreshpageconnection(){
    this.ionViewDidEnter();
   }
  togglemenu(){
    this.menu.toggle();
  }

}
