import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';
import { ModalController } from "@ionic/angular";
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  user_info: any = {
    id: "",
    data: {}
};

  name: any;
  saldo: any;
  cuenta: any;
  total:number;
  public grantotal;

  // arrayColeccionTareas: any = [{
  //   id: "",
  //   data: {} as Carro1
  //  }];

  constructor(private modalCtrl: ModalController,private firestoreService: FirestoreService,public popoverController: PopoverController, public router:Router, public afAuth:AngularFireAuth) {
    //this.obtenerListaTareas();
    //console.log(this.arrayColeccionTareas)
    //this.consultarviajes();
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getuseruid();
    console.log("bienvenido: ")
  }
  
  async getuseruid(){
    let uid = await (await this.afAuth.currentUser).uid
    console.log("uid " + uid)
    this.getName(uid);
  }
  
  
  async getName(uid){
    this.firestoreService.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
        //let name = resultado.payload.data();
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
          // Como ejemplo, mostrar el título de la tarea en consola
          //console.log("datos de viaje--> " + this.user_info.data.displayName);
      }
       this.name = this.user_info.data.displayName;
      let email = this.user_info.data.email;
      this.saldo = this.user_info.data.saldo_corriente;
      this.cuenta = this.user_info.data.cuenta_corriente;
      console.log("nombre: "  + this.name)
      console.log("email: "  + email);
      console.log("saldo: "  + this.saldo)
      console.log("cuenta: "  + this.cuenta)
  });
  }

  open_options(){
 console.log("abrir menu")
 this.presentPopover("present")
  }



  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      cssClass: 'popover',
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
  
}
