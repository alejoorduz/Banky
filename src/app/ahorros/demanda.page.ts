import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';
import { ModalController } from "@ionic/angular";
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadingController } from '@ionic/angular';



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

  lista_movimientos = [];
  loading: HTMLIonLoadingElement;
  constructor(private loadingController: LoadingController,private modalCtrl: ModalController,private fbs: FirestoreService,public popoverController: PopoverController, public router:Router, public afAuth:AngularFireAuth) {
     }

  ngOnInit() {
    this.presentLoading();
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
  setTimeout(() => {
    this.movimientos()
  }, 800);
  }

    movimientos(){
    
    this.fbs.consultar("/cuentas/"+this.name+"/cuentas/ahorros/movimientos").subscribe((servicios) => {
      this.lista_movimientos = [];
      servicios.forEach((datosTarea: any) => {
        this.lista_movimientos.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de edificios")
      console.log(this.lista_movimientos)
    });
    setTimeout(() => {
      this.loading.dismiss();
         }, 800);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Descargando movimientos...'
    });
    return this.loading.present();
  }
//-----------------------------------------------------------------------
}

