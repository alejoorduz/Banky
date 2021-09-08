import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';

import { publicacion } from '../publicacion';
import { IonicModule } from '@ionic/angular';
import { User } from "../user.interface";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  user_info: any = {
    id: "",
    data: {}
  };
  name:any;
  qrData : any;
  createdCode : any;
  scannedCode = null;
  uid:any;
  cantidad: number;
  razon;
  tipo;
 
  constructor(public barcodeScanner: BarcodeScanner, private fbs: FirestoreService,private afAuth: AngularFireAuth, public router:Router) { 
     }

     ionViewDidEnter(){
      this.getuseruid();
      console.log("bienvenido: ")
    }

  createCode() {
   // this.createdCode = this.qrData;
    this.createdCode = this.name + " " + this.uid + " " + this.tipo + " " +  this.cantidad + " " + this.razon;
    console.log(this.createdCode);
  }

  generateCode() {
    this.qrData = this.name + "/" + this.uid + "/" + this.tipo + "/" +  this.cantidad + "/" + this.razon;
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.qrData).then(
        res => {
          alert(res);
          this.qrData = res;
        }, error => {
          alert(error);
        }
    );
}

async getuseruid(){
   this.uid = await (await this.afAuth.currentUser).uid
 // console.log("uid " + uid)
  this.getName(this.uid);
}

async getName(uid){
  this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
    if (resultado.payload.data() != null) {
      //let name = resultado.payload.data();
        this.user_info.id = resultado.payload.id;
        this.user_info.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        //console.log("datos de viaje--> " + this.user_info.data.displayName);
    }
     this.name = this.user_info.data.displayName;
    let email = this.user_info.data.email;
    let saldo = this.user_info.data.saldo;
    console.log("nombre: "  + this.name)
    console.log("email: "  + email);
     console.log("saldo: "  + saldo)
});
}



  ngOnInit() {
       //console.log("comenzamos"+this.resumen)
  }



}
