import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import * as moment from "moment";
import { LoadingController } from '@ionic/angular';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trasnferir',
  templateUrl: './trasnferir.page.html',
  styleUrls: ['./trasnferir.page.scss'],
})
export class TrasnferirPage implements OnInit {
  user_info: any = {
    id: "",
    data: {}
  };
  name:any;
  uid:any;

  razon;
  tipo;

  cuenta;
  cantidad: number;
  ahorros;
  corriente;
  saldo_ahorros: number;
  saldo_corriente: number;

  user_recieve_info: any = {
    id: "",
    data: {}
};

user_recieve_account_info: any = {
  id: "",
  data: {}
};

recieve_name;
recieve_uid;
recieve_saldo_ahorros : number;
recieve_saldo_corriente : number;

  lista_proyectos  = [];
  cuenta_recibe  = [];
  loading: HTMLIonLoadingElement;
  constructor(private alertCtrl: AlertController,private loadingController: LoadingController,public barcodeScanner: BarcodeScanner, private fbs: FirestoreService,private afAuth: AngularFireAuth, public router:Router) { }

  ionViewDidEnter(){
    this.getuseruid();
    console.log("bienvenido: ")
    
  }

  consultar_lista_proyectos(){
    this.fbs.consultar("/cuentas/"+this.name+"/inscritas").subscribe((servicios) => {
      this.lista_proyectos = [];
      servicios.forEach((datosTarea: any) => {
        this.lista_proyectos.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de edificios")
      console.log(this.lista_proyectos)
    });
  }

consult_reciever_uid(){
   this.fbs.consultarPorId("cuentas/", this.cuenta.nombre).subscribe((resultado) => {
    if (resultado.payload.data() != null) {
        this.user_recieve_info.id = resultado.payload.id;
        this.user_recieve_info.data = resultado.payload.data();
    }
    this.recieve_name = this.user_recieve_info.id;
    this.recieve_uid = this.user_recieve_info.data.uid;
    
    setTimeout(() => {
    this.consult_reciever_account(this.recieve_uid)
  }, 1000);
});
  
}

consult_reciever_account(uid){
    console.log("nombre: "  + this.recieve_name)
    console.log("recive uid: "  + uid);
    this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_recieve_account_info.id = resultado.payload.id;
          this.user_recieve_account_info.data = resultado.payload.data();
      }
      this.recieve_saldo_ahorros = this.user_recieve_account_info.data.saldo_ahorros;
      this.recieve_saldo_corriente = this.user_recieve_account_info.data.saldo_corriente;
      console.log("saldo ahorros el que recivbe: "  + this.recieve_saldo_ahorros)
      console.log("saldo corriente el que recivbe: "  + this.recieve_saldo_corriente);
    });
    // setTimeout(() => {
    //   this.money_trasnfer()
    // }, 1000);
}

money_trasnfer(){
  this.presentLoading();
  console.log("el tipo que envia y tipo que recibe: ",this.tipo,this.cuenta.tipo,this.cantidad,typeof(this.cantidad))
  if(this.tipo === "ahorros"){
    console.log("sale de la cuenta de ahorros")
    var saldo_final_ahorros = +this.saldo_ahorros - +this.cantidad;
    this.fbs.update("user/", this.uid , { "saldo_ahorros": saldo_final_ahorros });
  }
  if(this.tipo === "corriente"){
    console.log("sale de la cuenta de corriente")
    var saldo_final_corriente = +this.saldo_corriente - +this.cantidad;
    this.fbs.update("user/", this.uid , { "saldo_corriente": saldo_final_corriente });
  }
  if(this.cuenta.tipo === "ahorros"){
    console.log("entra a la cuenta de ahorros")
    var saldo_final_recieve_ahorros = +this.recieve_saldo_ahorros + +this.cantidad;
  this.fbs.update("user/", this.recieve_uid , { "saldo_ahorros": saldo_final_recieve_ahorros });
  }
  if(this.cuenta.tipo === "corriente"){
    console.log("entra a la cuenta de corriente")
    var saldo_final_recieve_corriente = +this.recieve_saldo_corriente + +this.cantidad;
  this.fbs.update("user/", this.recieve_uid , { "saldo_corriente": saldo_final_recieve_corriente });
  }
  setTimeout(() => {
    this.save_transaction()
  }, 1000);
}

  save_transaction(){
  console.log("epaaa putaa -- " , this.cuenta.alias)
  this.consult_reciever_uid()
  var timei = new Date(Date.now());
  var ti = moment(timei).format('h:mm:ss a'); 
  var dt = moment(timei).format('DD-MM-YYYY');
  this.lista_proyectos.forEach(element => {
    console.log("cuentas_ ", element.id, element.data)
    if (element.id === this.cuenta.alias) {
      this.fbs.insertar("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "tipo_salida": this.tipo });
      this.fbs.insertar("cuentas/"+this.cuenta.name+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "tipo_salida": this.tipo });

      if(this.tipo === "ahorros"){
       this.fbs.update("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "cuenta_salida": this.ahorros });
       this.fbs.update("cuentas/"+this.cuenta.name+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "cuenta_salida": this.ahorros });

      }
      if(this.tipo === "corriente"){
        this.fbs.update("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "cuenta_salida": this.corriente });
        this.fbs.update("cuentas/"+this.cuenta.name+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "cuenta_salida": this.ahorros });

      }
      this.fbs.update("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "cuenta_recibe": this.cuenta.numero });
      this.fbs.update("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "recibe": this.cuenta.nombre });
      this.fbs.update("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "fecha": dt });
      this.fbs.update("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "hora": ti });
      this.fbs.update("cuentas/"+this.name+"/cuentas/"+this.tipo+"/movimientos", dt+ti , { "cantidad": this.cantidad });
     
      this.fbs.insertar("cuentas/"+this.cuenta.nombre+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "cuenta_recibe": this.cuenta.numero });
      this.fbs.insertar("cuentas/"+this.cuenta.nombre+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "recibe": this.name });
      this.fbs.insertar("cuentas/"+this.cuenta.nombre+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "fecha": dt });
      this.fbs.insertar("cuentas/"+this.cuenta.nombre+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "hora": ti });
      this.fbs.insertar("cuentas/"+this.cuenta.nombre+"/cuentas/"+this.cuenta.tipo+"/movimientos", dt+ti , { "cantidad": this.cantidad });



    }
  });
  setTimeout(() => {
    this.dismiss();
    this.loading.dismiss();
   // this.presentAlert("Dinero enviado exitosamente!")
   }, 800);
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    message: 'Generando transacción, por favor espere...'
  });
  return this.loading.present();
}

async presentAlert(error) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Listo',
    message: error,
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
         }
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

async getuseruid(){
   this.uid = await (await this.afAuth.currentUser).uid
  this.getName(this.uid);
}

async getName(uid){
  this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
    if (resultado.payload.data() != null) {
        this.user_info.id = resultado.payload.id;
        this.user_info.data = resultado.payload.data();
    }
     this.name = this.user_info.data.displayName;
    let email = this.user_info.data.email;
    this.ahorros = this.user_info.data.cuenta_ahorros;
    this.corriente = this.user_info.data.cuenta_corriente;
    this.saldo_ahorros = this.user_info.data.saldo_ahorros;
    this.saldo_corriente = this.user_info.data.saldo_corriente;
    console.log("nombre: "  + this.name)
    console.log("email: "  + email);
     console.log("ahorro y corriente : "  + this.ahorros, this.corriente)
     this.consultar_lista_proyectos()
});
}
  ngOnInit() {
  }

  dismiss(){
    this.router.navigate(['tabs']);
  }

}
