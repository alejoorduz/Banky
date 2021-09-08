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

  constructor(public popoverController: PopoverController,private geolocation: Geolocation, private fbs: FirestoreService ,private authSvc: AuthService, public router: Router, public afAuth:AngularFireAuth, private afs: AngularFirestore) {

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
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  getWeatherData(){ 
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.long+'&appid=7985db256b85b778e9af4d7ea225aaeb')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data){
    this.WeatherData = data;
    console.log("data: " + this.WeatherData.main)
    this.day_mood = (this.WeatherData.weather[0].main)
    console.log("MOOOOOOD: " + this.day_mood)
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    if (this.day_mood === "Rain") {
      $("#lluvia").text("No salgas, esta lloviendo")
      $("#lluvia").css("color","red");
      console.log("si llueve")
    }else{
      $("#lluvia").text("Puedes salir, no esta lloviendo")
      $("#lluvia").css("color","green");
    }
  }

  open_options(){
    console.log("abrir menu")
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
  let uid = await (await this.afAuth.currentUser).uid
 // console.log("uid " + uid)
  this.getName(uid);
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
   // console.log("nombre: "  + this.name)
   // console.log("email: "  + email);
   // console.log("saldo: "  + saldo)
});
}


  cerrarsesion(){
    this.authSvc.logout();
    this.router.navigate(["/ingresoadmin"])
  }

}
