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
import { Carro1 } from '../carro1';

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

  public carros: Array<Carro>;
  public parseado;
  public idviajepars;
  public idviaje;

  documentdia: any = {
    id: "",
    data: {} 
  };

  documentviaje: any = {
    id: "",
    data: {} 
  };


  editarcarro: Carro1;

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Carro1
   }];

   arrayColecciondia: any = [{
    id: "",
    data: {} 
   }];

   idTareaSelec: string;

   tasks:any = [] ;

  devices:any[] = [];
  statusMessage: string;
  peripheral: any = {};
  public dataFromDevice: any;
  mipiso:string;
  key:string = 'piso';
  public cancelado = false;
  className: string = 'clase1';
  

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
      this.consultardia();
      this.editarcarro = {} as Carro1;
      this.obtenerListaTareas();
      //this.consultarnumerodeviaje();
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

    clicBotonModificar(carro,id) {
      this.firestoreService.actualizar("carros/", this.idTareaSelec, carro).then(() => {
        // Actualizar la lista completa
        this.obtenerListaTareas();
        // Limpiar datos de pantalla
        this.editarcarro = {} as Carro1;
      })
    }

  

  ionViewDidEnter() {
    //console.log('ionViewDidEnter');
    //this.Scan();
    //this.Connect();
    this.setStatus('¡Bienvenido! Escoge el carro');
    //this.className = 'clase1';
  }

  refreshpageconnection(){
    this.ionViewDidEnter();
    
  }

  selecTarea(tareaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(tareaSelec);
    this.idTareaSelec = tareaSelec.id;
    this.editarcarro.id = tareaSelec.data.id;
    this.editarcarro.uuid = tareaSelec.data.uuid;
    this.editarcarro.marca = tareaSelec.data.marca;
    this.editarcarro.color = tareaSelec.data.color;
    this.editarcarro.viajes = tareaSelec.data.viajes;
    this.editarcarro.tiempo = tareaSelec.data.tiempo;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("carros", this.idTareaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.editarcarro = {} as Carro1;
    })
  }

  consultardia(){
    this.firestoreService.consultarPorId("carros/","carro1").subscribe((resultado) => {
      if(resultado.payload.data() != null) {
        this.documentdia.id = resultado.payload.id
        this.documentdia.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        console.log("datos--> del dia " + this.documentdia.data.dia);
      }
      this.parseado = this.documentdia.data.dia
      //this.idviaje = parseInt(this.parseado);
      console.log("EL DIA ES: " + this.parseado)
      console.log("TIPO: " + typeof(this.parseado))


      this.firestoreService.consultarPorId("bd/",this.parseado).subscribe((resultado) => {
        if(resultado.payload.data() != null) {
          this.documentviaje.id = resultado.payload.id
          this.documentviaje.data = resultado.payload.data();
          // Como ejemplo, mostrar el título de la tarea en consola
          console.log("datos de viaje--> " + this.documentviaje.data.num_viajes);
        }
        this.idviajepars = this.documentviaje.data.num_viajes
        this.idviaje = parseInt(this.idviajepars);
        console.log("EL VIAJE ESs: " + this.idviaje)
        console.log("TIPO: " + typeof(this.idviaje))
          //return this.idviaje;
       // this.firestoreService.update("carros","/carro"+this.id,{"producido": this.producido})
      });
       // return this.parseado;
     // this.firestoreService.update("carros","/carro"+this.id,{"producido": this.producido})   
    });
   // return this.parseado
  }

  obtenerListaTareas(){
    this.firestoreService.consultar("carros").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
     //console.log(this.arrayColeccionTareas)
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      this.parseado = this.documentdia.data.fecha_hoy
      console.log("aca hpta: " + this.parseado)
    });
  }

  togglemenu(){
    this.menu.toggle();
  }

  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
  }

  // If location permission is denied, you'll end up here
  async scanError(error) {
    this.setStatus('Error ' + error);
    let toast = await this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

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
