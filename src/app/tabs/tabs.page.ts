import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from '../auth.service';
import { User } from "../user.interface";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore";
import * as $ from 'jquery'
import { FirestoreService } from "../firestore.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';
import { ModalController } from "@ionic/angular";
import { InscripcionesPage } from "../inscripciones/inscripciones.page";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})

@Injectable()
export class TabsPage implements OnInit {
  
  lat;
  long;
  WeatherData:any = {
    main : {},
    isDay: true
  };
  day_mood: string;
  url;

  user_info: any = {
    id: "",
    data: {}
};

  name: any 

  uid;

  constructor(public popoverController: PopoverController,private modalCtrl: ModalController,private geolocation: Geolocation, private fbs: FirestoreService ,private authSvc: AuthService, public router: Router, public afAuth:AngularFireAuth, private afs: AngularFirestore) {

   }

   ionViewDidEnter(){
    this.getuseruid();
    this.getLocation();
    console.log("bienvenido: ")
  }
  

  ngOnInit() {
    console.log(this.WeatherData);
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
       this.lat = resp.coords.latitude;
       this.long = resp.coords.longitude;
       console.log("lat: " + this.lat + "   long: " + this.long)
       this.getWeatherData();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
     });
  }

  getWeatherData(){ 
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.long+'&appid=7985db256b85b778e9af4d7ea225aaeb')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data){
    this.WeatherData = data;
    this.day_mood = (this.WeatherData.weather[0].main)
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    if (this.day_mood === "Rain") {
      $("#lluvia").text("No salgas, esta lloviendo")
      $("#lluvia").css("color","red");
    }else{
      $("#lluvia").text("Puedes salir, no esta lloviendo")
      $("#lluvia").css("color","green");
    }
  }

  open_options(){
    this.presentPopover("popover")
     }
     async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopinfoComponent,
        cssClass: 'popover',
        event: ev,
        translucent: true
      });      
      return await popover.present();
      const { role } = await popover.onDidDismiss();
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
     console.log("nombre inicial: ", this.name)
    let email = this.user_info.data.email;
    let saldo = this.user_info.data.saldo;
});
}

async inscribir_cuenta(){
  const modal = await this.modalCtrl.create({
    component: InscripcionesPage,
    cssClass: 'adding_modal',
    componentProps: {
      name: this.name,
       uid: this.uid       
    }
  });
  modal.onDidDismiss()
  .then((data) => {
    console.log("esta es la data que devuelve el modal")
    console.log(data)
    var closing = data['data'];
    if (closing) {
      this.modalCtrl.dismiss()
    }else{
      console.log("no me cierro")
    } 
});
  return await modal.present();
}

  cerrarsesion(){
    this.authSvc.logout();
    this.router.navigate(["/ingresoadmin"])
  }

}
