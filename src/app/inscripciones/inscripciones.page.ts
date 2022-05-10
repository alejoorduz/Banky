import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from "@angular/router";
import { FirestoreService } from "../firestore.service";
import * as $ from "jquery";
import { ModalController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

  @Input() name
  @Input() uid

  alias
  nombre;
  cedula;
  tipo;
  numero;
  loading: HTMLIonLoadingElement;
  constructor(private alertCtrl: AlertController,private loadingController: LoadingController,private fbs: FirestoreService,private modalCtrl: ModalController ,private authsvc:AuthService, private router:Router) { }

  ngOnInit() {
    console.log("nombre y uid: " , this.name, this.uid)
  }

add_account(alias,nombre,cedula,tipo,numero){
  if ($("#alias").val() == "" || $("#nombre").val() == "" || $("#cedula").val() == "" || $("#tipo").val() == "" || $("#numero").val() == "") {
    alert("Debes rellenar todos los campos")
  }else{
    this.presentLoading();
      this.alias = $("#alias").val()
      this.nombre = $("#nombre").val()
      this.cedula = $("#cedula").val()
      //this.tipo = $("#tipo").val()
      this.numero = $("#numero").val()
      this.fbs.insertar("cuentas/"+this.name+"/inscritas", this.alias , { "nombre": this.nombre });
      this.fbs.update("cuentas/"+this.name+"/inscritas", this.alias , { "alias": this.alias });
      this.fbs.update("cuentas/"+this.name+"/inscritas", this.alias , { "cedula": this.cedula });
      this.fbs.update("cuentas/"+this.name+"/inscritas", this.alias , { "tipo": this.tipo });
      this.fbs.update("cuentas/"+this.name+"/inscritas", this.alias , { "numero": this.numero });
      $("#alias").val('')
      $("#nombre").val('')
      $("#cedula").val("")
      $("#tipo").val("")
      $("#numero").val('')
      setTimeout(() => {
        this.loading.dismiss();
        this.presentAlert("La cuenta fue inscrita correctamente!")
       }, 800);
  }
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    message: 'Guardando datos, por favor espere...'
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
          this.back();
        }
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

back(){
  this.modalCtrl.dismiss();
}

}

