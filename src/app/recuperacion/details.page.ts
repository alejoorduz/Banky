import { Component, OnInit } from '@angular/core';
import {  NgZone } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
//import { Carro } from "../../models/carros";
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';
import { IonicModule } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { AuthService } from '../auth.service';

const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";

//const BLE_SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
//const BLE_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit{

  peripheral: any = {};
  statusMessage: string;
  public dataFromDevice: any;
  power: boolean;
  mipiso:string;
  key:string = 'piso';
  //public idviaje;
  public producido;


  

  constructor(
    public route: ActivatedRoute, 
    public router: Router, 
    public authSvc: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService,
    private ngZone: NgZone) {}


    ngOnInit() {
  
    }
    
async onReset(email){
  try {
    await this.authSvc.resetPassword(email.value)
    this.router.navigate(['/ingresoadmin'])
  } catch (error) {
    console.log(error)
  }
}
  back(){
    this.router.navigate(['admin']);
  }

}

  
    
    