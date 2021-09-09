import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';
import { publicacion } from '../publicacion';
import { IonicModule } from '@ionic/angular';
import { User } from "../user.interface";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ToastController, AlertController } from '@ionic/angular';
import  *  as $ from "jquery";

@Component({
  selector: 'app-adicionardemanda',
  templateUrl: './adicionardemanda.page.html',
  styleUrls: ['./adicionardemanda.page.scss'],
})
export class AdicionardemandaPage implements OnInit {
  user_saldo_paga: any = {
    id: "",
    data: {}
};
user_saldo_recibe: any = {
  id: "",
  data: {}
};
  uid_paga:any;
  uid_recibe:any;
  nombre:any;
  tipo:any;// = "corriente"
  cuenta:any;
  monto:number;//  = 50000
  razon:any;
  scannedCode = null;
  saldo_actual_paga: any;
  saldo_nuevo_paga:any;
  saldo_actual_recibe: any;
  saldo_nuevo_recibe: any;


  constructor(public barcodeScanner: BarcodeScanner, private fbs: FirestoreService,private afAuth: AngularFireAuth,private alertCtrl: AlertController, public router: Router) { 
    
  }

  ngOnInit(){
  }

  ionViewDidEnter(){
    this.getuseruid();
    console.log("inicio")
  } 


  async getuseruid(){
    this.uid_paga = await (await this.afAuth.currentUser).uid
    console.log("uid del que paga: " + this.uid_paga)
    }

  scanCode() {
    console.log("escaneandooo QR")
    this.barcodeScanner.scan().then(barcodeData => {
      $("boton_pagar").prop('disabled', false);
      this.scannedCode = barcodeData.text;
      this.dividirString(this.scannedCode,"/");
    }, (err) => {
        console.log('Error: ', err);
    });
  }

   dividirString(cadenaADividir,separador) {
    var arrayDeCadenas = cadenaADividir.split(separador);
    this.nombre = arrayDeCadenas[0];
    this.uid_recibe = arrayDeCadenas[1];
    this.tipo = arrayDeCadenas[2];
    this.monto = parseInt(arrayDeCadenas[3]) ;
    this.razon = arrayDeCadenas[4];
    //document.write('<p>el nombre es : "' + this.nombre + '"' +'<br>el uid es : "' + this.uid_recibe + '"' 
    //+ '<br>la cuenta es : "' + this.tipo + '"' + '<br>el monto es : "' + this.monto + '"' + '<br>el tipo de monto es : "' + typeof(this.monto ) 
    //+ '"' + '<br>la razon es es : "' + this.razon + '"</p>');
 }

  consultar_saldos(){
      console.log("info de pago: " + this.scannedCode)
    console.log("uid paga: " + this.uid_paga + "  uid recibe: " + this.uid_recibe)
    //document.write("<p>uid paga: " + this.uid_paga + "  uid recibe: " + this.uid_recibe);
  //Restale la plata al que la envia
  this.fbs.consultarPorId("user/", this.uid_paga).subscribe((resultado) => {
    if (resultado.payload.data() != null) {
      let saldo = resultado.payload.data();
        this.user_saldo_paga.id = resultado.payload.id;
        this.user_saldo_paga.data = resultado.payload.data();
     }
     if (this.tipo == "ahorros") {
      this.saldo_actual_paga = this.user_saldo_paga.data.saldo_ahorros;
     } if (this.tipo == "corriente") {
      this.saldo_actual_paga = this.user_saldo_paga.data.saldo_corriente;
     }
      console.log("saldo atual que paga : "  + this.saldo_actual_paga)
     this.saldo_nuevo_paga = this.saldo_actual_paga - this.monto;
     console.log("monto nuevo restao al que paga: " + this.saldo_nuevo_paga)
    });

    this.fbs.consultarPorId("user/", this.uid_recibe).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
        let saldo = resultado.payload.data();
          this.user_saldo_recibe.id = resultado.payload.id;
          this.user_saldo_recibe.data = resultado.payload.data();
       }
       if (this.tipo == "ahorros") {
        this.saldo_actual_paga = this.user_saldo_paga.data.saldo_ahorros;
       } if (this.tipo == "corriente") {
        this.saldo_actual_paga = this.user_saldo_paga.data.saldo_corriente;
       }
        this.saldo_actual_recibe = this.user_saldo_recibe.data.saldo_corriente;
        console.log("saldo atual que recibe : "  + typeof(this.saldo_actual_recibe))
       this.saldo_nuevo_recibe = this.saldo_actual_recibe + this.monto; 
       //document.write("<p>saldo actual: " + this.saldo_actual_recibe + "  saldo nuevio: " + this.saldo_nuevo_recibe);
       //document.write("<p>saldo actual tipo: " + typeof(this.saldo_actual_recibe)  + "  saldo nuevio: " + typeof(this.saldo_nuevo_recibe) );

       console.log("monto nuevo restao al que recibe: " + this.saldo_nuevo_recibe)
      });

 setTimeout(()=>{
   this.make_transfer();
 },1000)
  
  }

  make_transfer(){
    $("boton_pagar").prop('disabled', true);
    if (this.tipo == "ahorros") {
      this.fbs.update("user", this.uid_paga , { saldo_ahorros: this.saldo_nuevo_paga });
      this.fbs.update("user", this.uid_recibe, { saldo_ahorros: this.saldo_nuevo_recibe });
     } if (this.tipo == "corriente") {
      this.fbs.update("user", this.uid_paga , { saldo_corriente: this.saldo_nuevo_paga });
      this.fbs.update("user", this.uid_recibe, { saldo_corriente: this.saldo_nuevo_recibe });
     }
    setTimeout(()=>{
      this.presentAlert();
    },500)
  }

  guardar_movimiento(){}

  back(){
   // console.log("adicionemos")
    this.router.navigate(["/tabs"])
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Hecho!',
      subHeader: 'Fue una trasnferencia exitosa',
      message: 'Gracias por utilizar nuestros servicios',
      buttons: ['OK']
    });

    await alert.present();

    this.router.navigate(["/tabs"])
    //console.log('onDidDismiss resolved with role', role);
  }
}


