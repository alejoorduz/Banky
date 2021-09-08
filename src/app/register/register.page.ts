import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from "@angular/router";
import { FirestoreService } from "../firestore.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private fbs: FirestoreService ,private authsvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

async onRegister(email, password,nombre,apellido){
  console.log("registro-------------" + email.value + password.value + nombre.value + apellido.value)
  console.log(email, password)
  try {
    const user = await this.authsvc.register(email.value,password.value,nombre.value)
    if (user) {
    let uid = user.uid
    const isverified = this.authsvc.isEmailVerified(user);
    console.log("entre sisass perroooo" + uid)
    this.initialize_user(uid);
    this.router.navigate(['inicio']);
    }
  } catch (error) {
    console.log(error)
    
  }
}

initialize_user(uid){
  let cCorriente = Math.floor(Math.random()*(10000000000-1000000000+1)+1000000000);
  let cAhorros = cCorriente + 1;
  console.log("usuario inicializado correctamente")
  this.fbs.update("user", uid , { cuenta_corriente: cCorriente });
  this.fbs.update("user", uid , { cuenta_ahorros: cAhorros });
  this.fbs.update("user", uid , { saldo_corriente: 1000000 });
  this.fbs.update("user", uid , { saldo_ahorros: 1500000 });
}

redirectUser(isverified:boolean){
  if(isverified){
    this.router.navigate(['inicio']);
  }else{
    console.log("verificar email")
  }
}

}
