import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from "@angular/router";
import { FirestoreService } from "../firestore.service";
import * as $ from "jquery";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  nombre;
  email;
  contraseña;

  constructor(private fbs: FirestoreService ,private authsvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

async onRegister(email, password,nombre){
  console.log("registering : ", email, password,nombre)
  try {
    const user = await this.authsvc.register(email.value,password.value,nombre.value)
    if (user) {
    let uid = user.uid
    const isverified = this.authsvc.isEmailVerified(user);
    this.initialize_user(uid,nombre);
    }
  } catch (error) {
    console.log(error)
  }
}

initialize_user(uid,nombre){
  this.nombre = $("#nombre").val()
  let cCorriente = Math.floor(Math.random()*(10000000000-1000000000+1)+1000000000);
  let cAhorros = cCorriente + 1;
  console.log("usuario inicializado correctamente: " + this.nombre + typeof(this.nombre)) 
  this.fbs.update("user", uid , { cuenta_corriente: cCorriente });
  this.fbs.update("user", uid , { cuenta_ahorros: cAhorros });
  this.fbs.update("user", uid , { saldo_corriente: 1000000 });
  this.fbs.update("user", uid , { saldo_ahorros: 1500000 });
  this.fbs.insertar("cuentas/"+this.nombre+"/cuentas", "corriente" , { "numero": cCorriente });
  this.fbs.insertar("cuentas/", this.nombre , { "uid": uid });
  this.fbs.update("cuentas/"+this.nombre+"/cuentas", "corriente" , { "saldo": 1000000 });
  this.fbs.insertar("cuentas/"+this.nombre+"/cuentas", "ahorros" , { "cuenta_ahorros": cAhorros });
  this.fbs.update("cuentas/"+this.nombre+"/cuentas", "ahorros" , { "saldo": 1500000 });
  this.router.navigate(['inicio']);
}

redirectUser(isverified:boolean){
  if(isverified){
    this.router.navigate(['inicio']);
  }else{
    console.log("verificar email")
    alert("Verifica que tu cuenta ya esta verificada. (Revisa tambien en spam)")
  }
}

}
