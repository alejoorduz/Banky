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
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  user_info: any = {
    id: "",
    data: {}
};
  uid;
  name: any;
  saldo: any;
  cuenta: any;
  total:number;
  public grantotal;

  lista_movimientos = [];

  loading: HTMLIonLoadingElement;
  constructor(private loadingController: LoadingController,private modalCtrl: ModalController,private firestoreService: FirestoreService,public popoverController: PopoverController, public router:Router, public afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.presentLoading();
  }
  

  ionViewDidEnter(){
    this.getuseruid();
    console.log("bienvenido: ")
  }
  
  async getuseruid(){
try {
   this.uid = await (await this.afAuth.currentUser).uid
} catch (error) {
  console.log("Error del uid: ", error)
  this.router.navigate(["/ingresoadmin"])
}
    console.log("uid " +  this.uid)
    this.getName();
  }
  
  
  async getName(){
    this.firestoreService.consultarPorId("user/", this.uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
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
  setTimeout(() => {
    this.movimientos()
  }, 800);
  }

  movimientos(){
    this.firestoreService.consultar("/cuentas/"+this.name+"/cuentas/corriente/movimientos").subscribe((servicios) => {
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
      //this.presentAlert("La cuenta fue inscrita correctamente!")
     }, 800);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Descargando movimientos...'
    });
    return this.loading.present();
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
