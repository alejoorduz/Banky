import { Component, Input, OnInit, NgZone } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { BLE } from '@ionic-native/ble/ngx';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
//import { time } from 'console';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../../firestore.service';
import { Carro1 } from '../../carro1';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { identifierModuleUrl } from '@angular/compiler';
import { ObjectUnsubscribedError } from 'rxjs';
import { Router, NavigationExtras } from "@angular/router";

const AIRCALL_SERVICE = '';
//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________


@Component({
  selector: 'app-active-car-modal',
  templateUrl: './active-car-modal.page.html',
  styleUrls: ['./active-car-modal.page.scss'],
})
export class ActiveCarModalPage implements OnInit {

  document: any = {
    id: "",
    data: {} as Carro1
  };

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Carro1
   }];

  idTareaSelec: string;

  editarcarro: Carro1;
  
  statusMessage: string;
  public cancelado = false;

  @Input() uuid;
  @Input() id; 
  @Input() viajes;
  @Input() tiempo;
  @Input() marca; 
  @Input() color;
  @Input() creado;
  @Input() fecha;
  @Input() idviaje;
  @Input() dia;

  public tiempofinal;
  public tiempoinicial
  public horainicial;
  public minutoinicial;
  public segundoinicial;
  public horafinal;
  public minutofinal;
  public segundofinal;

  public on;
  public minint;
  public viajenum;
  public horain;
  public tibd;

  devices:any[] = [];

  public boton_comenzar;
  public boton_finalizar;
  public show = true;
  public spinner = true;
  public boton = true;
  public botonatras = false;

  constructor(public alertController: AlertController,
    private modalCtrl: ModalController,
    public router: Router,
    private ble: BLE,
    private ngZone: NgZone,
    private firestoreService: FirestoreService) { }

  ngOnInit() {  
    console.log("entreeee-------------------")
    this.spinner = true;
    this.boton = true;
    //this.connected(this.uuid,this.id);
    this.comenzar();  
  }

  connected(uuid,id){   
      document.getElementById('tiempo').textContent = "Comenzando viaje ";
      document.getElementById('tiempomsj').textContent = "¡Asegúrate de tener el carro cerca y el Bluetooth encendido!"; // Conectando:¡Asegúrate de tener el carro cerca!
      document.getElementById('producido').textContent = "Conectando:";
      document.getElementById('producidomsj').textContent = "Si el carro esta cerca y no conecta vuelve atrás e intenta nuevamente";
      this.spinner = false;
      this.boton=true;
    (<any>window).ble.autoConnect(uuid, device => {
      document.getElementById('tiempo').textContent = "Conectando... ";
      this.BleWrite(uuid);
      setTimeout(() => {
        this.Disconnect(uuid);
       }, 350)
    }, error => {
      console.log('Disconnected', error);
      this.cancelado = false;
      document.getElementById('tiempo').textContent = "Error";
      document.getElementById('tiempomsj').textContent = "Asegurate que el carro esta cerca";
    });
    }
  
  disconnect(uuid){
    (<any>window).ble.autoConnect(uuid, device => {
      this.setStatus('Enviando comando...');
     // console.log('Connected', device);
      this.disconectwrite(uuid);
      setTimeout(() => {
        this.Disconnect(uuid);
       }, 350)
    }, error => {
      console.log('Disconnected', error);
      this.cancelado = false;
      this.setStatus('Error: Asegurate que el carro este cerca!');
    });
    }
  
    disconectwrite(uuid) {
      var data = new Uint8Array(1);
      data[0] = 0x32 ;
      this.ble.write(
              uuid,
              BLE_SERVICE,
              BLE_CHARACTERISTIC,
              data.buffer
          )
          .then(
              data => {
                  debugger;   
                  console.log(data);
                  this.setStatus('Comando Enviado!');
              },
              err => {
                  console.log(err);
                  this.setStatus('Error: Intenta de nuevo');
              }
          );     
    }
    
    BleWrite(uuid) {
        var data = new Uint8Array(1);
        data[0] = 0x31;
        this.ble.write(
                uuid,
                BLE_SERVICE,
                BLE_CHARACTERISTIC,
                data.buffer
            )
            .then(
                data => {
                    debugger;  
                    this.spinner = true; 
                    this.botonatras = true;
                    console.log(data);
                    document.getElementById('tiempo').textContent = "Conectado";
                    document.getElementById('tiempomsj').textContent = "¿El carro prendio?";
                    this.comenzar();
                    this.boton = false;
                    //this.comenzar();
                    
                },
                err => {
                    console.log(err);
                    this.spinner=true;
                    this.boton=false;
                    this.setStatus('Error: Intenta de nuevo y asegurate que el carro este cerca');
                }
            );     
    }
  
    Disconnect(uuid){
      this.ble.disconnect(uuid)
      .then(data => {
      console.log("disconnected good");
      this.cancelado = false;
      this.setStatus('¡Listo!');
      
  });
    }
  
  comenzar(){
    this.boton_comenzar = true;
    //this.connected(this.uuid,this.id)
    this.viajes++;
    this.idviaje++;
    this.on = true;
    var timei = new Date(Date.now());
    this.tiempoinicial = timei;
    var ti = moment(this.tiempoinicial).format('h:mm a'); // var ti = moment(this.tiempoinicial).format('DD MM YYYY, h:mm:ss a');
    var dt = moment(this.tiempoinicial).format('DD-MM-YY'); // var ti = moment(this.tiempoinicial).format('DD MM YYYY, h:mm:ss a');
  
    //console.log("el tipo de dato essssss: " + typeof(ti))
    //console.log("Tiempo comenzado:" + ti)
    this.insertarhorainicio(ti,dt);
    //this.router.navigate(['home']);
    //this.sinarg();
  }
  
  insertarhorainicio(ti,dt) {
    this.firestoreService.insertar("carros/carro"+this.id+"/viajes","/viaje"+this.viajes,{"salio": ti})
    console.log("hora inicio --->" + ti);
    console.log("fecha --->" + dt);
    this.firestoreService.update("carros/carro"+this.id+"/viajes","/viaje"+this.viajes,{"fecha": dt})
    this.firestoreService.update("carros/","carro"+this.id,{"out": true})
    this.firestoreService.update("carros/","carro"+this.id,{"viajes": this.viajes})
    this.firestoreService.update("carros/","carro"+this.id,{"encurso": this.idviaje})
    this.firestoreService.update("carros/","carro"+this.id,{"dia": dt})

    
    this.firestoreService.insertar("bd/",dt,{"num_viajes": this.idviaje})
    this.firestoreService.update("bd/",dt,{"dia": dt})

   // this.firestoreService.update("bd/","viajes",{"total": this.idviaje})
    this.firestoreService.insertar("bd/"+dt+"/todos/","viaje"+this.idviaje,{"id": this.idviaje})
    this.firestoreService.update("bd/"+dt+"/todos/","viaje"+this.idviaje,{"carro": this.id})
    this.firestoreService.update("bd/"+dt+"/todos/","viaje"+this.idviaje,{"salio": ti})
    this.firestoreService.update("bd/"+dt+"/todos/","viaje"+this.idviaje,{"fecha": dt})
    this.modalCtrl.dismiss();
  }

  
    
  modificarviajefin(minint, totalAmount, ti, tf, out,) {
    console.log("entre acay y el tipo es: " + typeof(ti))
    var carro = {
      id: this.id,
      uuid: this.uuid,
      marca: this.marca,
      color: this.color,
      viajes: this.viajes,
      tiempo: minint,
      producido: totalAmount,
      out: out
    }
    var viaje = {
      viaje_num: this.viajes,
      salio: ti,
      entro: tf
    }
    this.firestoreService.actualizar("carros/", "carro"+this.id, carro).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.editarcarro = {} as Carro1;
    })
    this.firestoreService.actualizar("carros/carro"+this.id+"/viajes", "/viaje"+this.viajes, viaje).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.editarcarro = {} as Carro1;
    })
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
    });
  }
  
  BleRead(uuid){
    // read data from a characteristic, do something with output data
  this.ble.read(uuid, 
    BLE_SERVICE,
    BLE_CHARACTERISTIC)
    .then(
        data => {
          console.log("Hooray we have data"+JSON.stringify(data));
            this.setStatus('Comando Enviado!');
        },
        err => {
            console.log(err);
            this.setStatus('Error: Intenta de nuevo');
        }
    /*  
    function(data){
        console.log("Hooray we have data"+JSON.stringify(data));
        alert("Successfully read data from device."+JSON.stringify(data));
    },
    function(failure){
        alert("Failed to read characteristic from device.");
    }*/
  );
  }
  
  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
     // this.statusMessage = message;
    });
  }
  
  sinarg(){
    //this.router.navigate(['home']);
    this.modalCtrl.dismiss();
   // console.log(this.uuid)
    
  }
  
  conarg(){
    this.modalCtrl.dismiss({
      on: this.on
    /*  id: this.id,
      uuid: this.uuid,
      marca: this.marca,
      color: this.color,
      viajes: this.viajes,
      tiempo: this.tiempo,
      producido: this.tiempo*/
    })
  }
  
}
