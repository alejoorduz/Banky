import { Component, Input, OnInit, NgZone } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { BLE } from '@ionic-native/ble/ngx';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
//import { time } from 'console';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../../firestore.service';

import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { identifierModuleUrl } from '@angular/compiler';
import { ObjectUnsubscribedError } from 'rxjs';


const AIRCALL_SERVICE = '';
//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe2";


//____________________________________________________________

@Component({
  selector: 'app-desactivate',
  templateUrl: './desactivate.page.html',
  styleUrls: ['./desactivate.page.scss'],
})
export class DesactivatePage implements OnInit {

  public elapsed;
  temperature: number;

  peripheral: any = {};
  public dataFromDevice: any;

 

  

  idTareaSelec: string;

  
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
  @Input() encurso;
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

  public onsale;
  public minint;
  public viajenum;
  public horain;
  public tibd;
  public daty;

  devices:any[] = [];

  public boton_comenzar;
  public boton_finalizar;
  public show = true;
  public spinner = true;
  public boton = true;
  public botonatras = true;
  public botonatrasdos = true;
  public thing;
  

  constructor(public alertController: AlertController,
    private modalCtrl: ModalController,
    private ble: BLE,
    private ngZone: NgZone,
    private firestoreService: FirestoreService) {
     }

     ngOnInit() { 
       console.log("EL ID DEL VIAJE ES: " + this.idviaje)
      this.spinner = false;
      this.botonatrasdos = false
      document.getElementById('tiempo').textContent = "Terminando viaje";
      document.getElementById('tiempomsj').textContent = "¡Asegúrate de tener el carro cerca y el Bluetooth encendido!";
      document.getElementById('producido').textContent = "Conectando:";
      document.getElementById('producidomsj').textContent = "Si el carro esta cerca y no conecta vuelve atrás e intenta nuevamente";
      this.finalizar(10,15000);
      //  this.ble.connect(this.uuid).subscribe(
      //    peripheral => this.onConnected(peripheral),
      //   peripheral => document.getElementById('mensaje').textContent = "Error conectando app"
      //  );
    }

    onConnected(peripheral) {
      this.peripheral = peripheral;
     // this.setStatus('Connected to ' + this.peripheral.descriptor + this.peripheral.id)
    this.ngZone.run(()=>{
      var data = new Uint8Array(1);
      data[0] = 0x32;
      this.ble.write(this.peripheral.id,BLE_SERVICE,"ffe1",data.buffer)
                    .then(
                        data => {
                            debugger;  
                            this.botonatrasdos = true;
                            document.getElementById('tiempo').textContent = "Carro Apagado";
                            document.getElementById('tiempomsj').textContent = "Obteniendo informacion del carro";                           
                            },
                        err => {
                            console.log(err);
                            this.spinner=true;
                            this.boton=false;
                            document.getElementById('tiempo').textContent = "Error";
                            document.getElementById('tiempomsj').textContent = "Intenta de nuevo y asegurate que el carro este cerca";
                        }
                    );

                    setTimeout(() => {
                      this.ble.startNotification(this.peripheral.id, BLE_SERVICE, BLE_CHARACTERISTIC)
                      .subscribe(
                          data => {
                              this.spinner = true; 
                              var array = new Uint8Array(data[0]);
                              var convertData = String.fromCharCode.apply(null, array);
                                  document.getElementById('tiempo').textContent = "El trayecto duró:";
                                  document.getElementById('tiempomsj').textContent = convertData + " Minutos";
                                  if (convertData <= 1) {
                                    var producid = 0;
                                  } else if (convertData > 1 && convertData <=11) {
                                    var producid = 7000;
                                } else {
                                  producid = 7000 + ((convertData-11) * 500)
                                }
                                  document.getElementById('producido').textContent = "El cliente debe pagar: ";
                                  document.getElementById('producidomsj').textContent = "$" + producid + "  Pesos";
                                  this.finalizar(convertData,producid);
                                  this.Disconnect(this.uuid);
                                 },
                          () => {
                              this.setStatus("Error Notify")
                              this.botonatras = false;
                              });
                       }, 1000)
                      });
    }

  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.uuid).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }
       
    Disconnect(uuid){
      this.ble.disconnect(uuid)
      .then(data => {
        //document.getElementById('mensaje').textContent = "Listo :)";
      //this.cancelado = false;
      this.setStatus('¡Listo!');
      
  });
    }
    
  finalizar(tiempo,prod){
    var transcurrido;
    var totalAmount;
    var timef= new Date(Date.now());
    this.tiempofinal = timef;
  
    console.log("Tiempo finalizado:" + this.tiempofinal);
  
    let diff = moment(this.tiempofinal, 'HH:mm').diff(moment(this.tiempoinicial, 'HH:mm'))
    let d = moment.duration(diff);
    let hours =  Math.floor(d.asHours());
    let minutes = moment.utc(diff).format("mm");
    //let minint = parseInt(minutes);
    let minint = tiempo;
    /*if (minint <= 10) {
        totalAmount = 7000;
    } else {
      totalAmount = 7000 + ((minint-10) * 500)
    }*/
    totalAmount = prod;
    
    transcurrido = hours + ":" + minutes ;
    //console.log("minuos pasados: " + minutes)
    //console.log("diference" + d)
    //console.log("tiempo trascurrido: " + transcurrido)
    //console.log("cargo total: " + totalAmount)
  
    
    var tf = moment(this.tiempofinal).format('h:mm a');
    //console.log("este es tf type: " + typeof(tf))
    
    this.insertarhorafinal(this.viajes,tf,minint,totalAmount);
    this.firestoreService.update("carros/","carro"+this.id,{"out": false})
    this.botonatras = false;
  //  this.modificarviajefin(minint, totalAmount, this.tibd, tf, this.out);
 // this.disconnect(this.uuid);
  
  }
  
  insertarhorafinal(id,hf,time,total){  
    this.firestoreService.update("carros/carro"+this.id+"/viajes","/viaje"+this.viajes,{"id": id})
    this.firestoreService.update("carros/carro"+this.id+"/viajes","/viaje"+this.viajes,{"entro": hf})
    this.firestoreService.update("carros/carro"+this.id+"/viajes","/viaje"+this.viajes,{"tiempo": time})
    this.firestoreService.update("carros/carro"+this.id+"/viajes","/viaje"+this.viajes,{"plata": total})

  
    this.firestoreService.update("bd/"+this.dia+"/todos","/viaje"+this.encurso,{"entro": hf})
    this.firestoreService.update("bd/"+this.dia+"/todos","/viaje"+this.encurso,{"tiempo": time})
    this.firestoreService.update("bd/"+this.dia+"/todos","/viaje"+this.encurso,{"plata": total})

  }
  
 
  

  
  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
  
  sinarg(){
    this.modalCtrl.dismiss();
    console.log(this.uuid)
  }
  
  conarg(){
    this.modalCtrl.dismiss({
      on: this.onsale
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
