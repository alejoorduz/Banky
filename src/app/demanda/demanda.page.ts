import { Component, OnInit } from '@angular/core';
import { Carro } from "../models/carros";
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';
//import { Carro1 } from '../carro1';
import { ModalPage } from '../Modals/modal/modal.page';
import { ModalController } from "@ionic/angular";
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";




@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.page.html',
  styleUrls: ['./demanda.page.scss'],
})
export class DemandaPage implements OnInit {

  user_info: any = {
    id: "",
    data: {}
};

  name: any 
  saldo: any;
  cuenta: any;

  total:number;
  public grantotal;

  // arrayColeccionTareas: any = [{
  //   id: "",
  //   data: {} as Carro1
  //  }];

  constructor(private modalCtrl: ModalController,private fbs: FirestoreService,public popoverController: PopoverController, public router:Router, public afAuth:AngularFireAuth) {
    //this.obtenerListaTareas();
    //console.log(this.arrayColeccionTareas)
   // this.consultarviajes();
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
      this.saldo = this.user_info.data.saldo_ahorros;
      this.cuenta = this.user_info.data.cuenta_ahorros;
      console.log("nombre: "  + this.name)
      console.log("email: "  + email);
      console.log("saldo: "  + this.saldo)
      console.log("cuenta: "  + this.cuenta)
  });
  }

//-----------------------------------------------------------------------






agregarpublic(){
  console.log("adicionemos")
  this.router.navigate(["/adicionardemanda"])
}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      cssClass: 'popover',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async abrirmodal(nombre,resumen,costo,unidad,categoria,observaciones){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'mymodaldos',
      componentProps: {
        nombre : nombre,
        resumen: resumen,
        costo: costo,
        unidad: unidad,
        categoria: categoria,
        observaciones: observaciones
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      const producido = data['data'];
      // console.log("viajes" + viajes)
      // console.log("viajes string" + JSON.stringify(viajes));
      // var id = viajes.id;
      // console.log("id" + id);
      // var numero_viajes = viajes.viajes;
  });

    return await modal.present();
    
  }

  // consultarviajes(){
  //   this.firestoreService.consultar("publicaciones_demanda").subscribe((resultadoConsultaTareas) => {
  //     this.arrayColeccionTareas = [];
  //     resultadoConsultaTareas.forEach((datosTarea: any) => {
  //       this.arrayColeccionTareas.push({
  //         id: datosTarea.payload.doc.id,
  //         data: datosTarea.payload.doc.data()
  //       });
  //     }) 
  //     console.log(this.arrayColeccionTareas)
  //     this.grantotal = this.arrayColeccionTareas.reduce(function (r, a) {
  //       console.log(a.data.producido) 
  //       return r + a.data.producido;
  //       }, 0);
  //     console.log(this.grantotal) 
  //   });
  //   }

  // obtenerListaTareas(){
  //   this.firestoreService.consultar("carros").subscribe((resultadoConsultaTareas) => {
  //     this.arrayColeccionTareas = [];
  //     resultadoConsultaTareas.forEach((datosTarea: any) => {
  //       this.arrayColeccionTareas.push({
  //         id: datosTarea.payload.doc.id,
  //         data: datosTarea.payload.doc.data()
  //       });
  //     })
  //   });
  // }

}
