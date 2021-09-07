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
import { Carro1 } from '../carro1';
import { ActiveCarModalPageRoutingModule } from '../Modals/active-car-modal/active-car-modal-routing.module';
import { ViajesaldiaPage } from '../Modals/viajesaldia/viajesaldia.page';
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

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Carro1
   }];

   arrayordenado: any = [{
    id: "",
    data: {} as Carro1
   }];

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
   
    
  consultarviajes(){
    this.firestoreService.consultar("bd").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });

      }) 
      
      // this.arrayordenado = this.arrayColeccionTareas.sort((a,b)=> a.data.id-b.data.id);
      // console.log("EL ARRAY ES: " + this.arrayColeccionTareas)
      // this.producido = this.arrayColeccionTareas.reduce(function (r, a) {
      //   console.log(a.data.plata) 
      //   return r + a.data.plata;
      //   }, 0);
      // console.log(this.producido) 


      //this.firestoreService.update("carros","/carro"+this.id,{"producido": this.producido})
    });   
  }

 

  back(){
    this.router.navigate(['admin']);
  }

  async abrirmodal(dia,viajenum){
    const modal = await this.modalCtrl.create({
      component: ViajesaldiaPage,
      cssClass: 'mymodal',
      componentProps: {
        dia: dia,
        viajenum: viajenum    
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      const producido = data['data'];
    
      console.log("viajes" + producido)
      console.log("viajes string" + JSON.stringify(producido));
      var id = producido.producido;
      console.log("id" + id);
      var totaldia = producido.producido;
  });
    return await modal.present();
  }

  }    

  
    
    