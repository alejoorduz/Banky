import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../firestore.service';
import { publicacion } from '../publicacion';
import { IonicModule } from '@ionic/angular';
import { User } from "../user.interface";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionardemanda',
  templateUrl: './adicionardemanda.page.html',
  styleUrls: ['./adicionardemanda.page.scss'],
})
export class AdicionardemandaPage implements OnInit {

  publicacion: publicacion;

  document: any = {
    id: "",
    data: {} 
  };

  public parseado;
  public idpub;


  constructor(private firestoreService: FirestoreService,private afAuth: AngularFireAuth, public router: Router) { 
    this.publicacion = {} as publicacion;
  }

  ngOnInit() {
    this.consultarpub();
    //console.log("comenzamos"+this.resumen)
  }

  consultarpub(){
    this.firestoreService.consultarPorId("totales/","total_public_demanda").subscribe((resultado) => {
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        console.log("hola" + this.document.data.id);
      }
      this.parseado = this.document.data.total_pub;
      this.idpub = parseInt(this.parseado);
      console.log("EL ID DEL VIAJE ES: " + this.idpub)
      console.log("EL TIPO DEL VIAJE ES: " + typeof(this.idpub))
        return this.idpub;
     // this.firestoreService.update("carros","/carro"+this.id,{"producido": this.producido})
    });
  this.idpub++;
  }

  insertar() {
    console.log("idpub= " + this.idpub++)
    var user = firebase.auth().currentUser;
    console.log("this user is: " + user)
    if (user != null) {
      // $scope.user = {
      //   name: user.displayName,
      //   email: user.email,
      // }
    }
    this.firestoreService.insertar("totales","total_public_demanda", {total_pub: this.idpub++})
    this.firestoreService.insertar("publicaciones_demanda","publicacion"+this.idpub, {nombre: user.displayName});
    this.firestoreService.update("publicaciones_demanda","publicacion"+this.idpub, {email: user.email})
    this.firestoreService.update("publicaciones_demanda","publicacion"+this.idpub, {resumen: this.publicacion.resumen})
    this.firestoreService.update("publicaciones_demanda","publicacion"+this.idpub, {costo: this.publicacion.costo})
    this.firestoreService.update("publicaciones_demanda","publicacion"+this.idpub, {unidad: this.publicacion.unidad})
    this.firestoreService.update("publicaciones_demanda","publicacion"+this.idpub, {categoria: this.publicacion.categoria})
    this.firestoreService.update("publicaciones_demanda","publicacion"+this.idpub, {observaciones: this.publicacion.observaciones})
    this.router.navigate(["/tabs/add"]);
  };
  
};
