import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { Router, NavigationExtras } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ingresoadmin',
  templateUrl: './ingresoadmin.page.html',
  styleUrls: ['./ingresoadmin.page.scss'],
})
export class IngresoadminPage implements OnInit {

  contra_escrita: String;
  
  user: any = {};

  constructor(public router: Router,private authSvc: AuthService) { }

  ngOnInit() {
  }

async onlogin(email,password){
try {
  const user = await this.authSvc.login(email.value,password.value);
  if (user){
    const isverified = this.authSvc.isEmailVerified(user);
    console.log("entre sisass perro" + user)
    this.redirectUser(isverified)
  }
} catch (error) {
  
}
}

async onloginGoogle(){
  try {
    const user = await this.authSvc.loginGoogle();
    if(user){
      const isverified = this.authSvc.isEmailVerified(user);
      console.log("correo verificado ->" + isverified)
      console.log("entre-.....") 
      this.redirectUser(isverified)
    }
  } catch (error) {
    
  }
}

redirectUser(isverified:boolean = true){
  if(isverified){
    this.router.navigate(['tabs']);
  }else{
    console.log("verificar email")
  }
}
    // this.router.navigate(['tabs']);
   
//   this.authobj.signInWithEmailAndPassword(this.user.email,this.user.password).then((res)=>{
// console.log(res);
//   }).catch(e=> {
//     console.log(e)
//   })
  }

