import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { BLE } from '@ionic-native/ble/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ViajesaldiaPageModule} from './Modals/viajesaldia/viajesaldia.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

//import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//import { environment } from "../environments/environment.prod";
import { environment } from '../environments/environment';



import { IonicStorageModule  } from "@ionic/storage";
import { ViajesaldiaPage } from './Modals/viajesaldia/viajesaldia.page';
//import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    NgxQRCodeModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    ViajesaldiaPageModule,
    AngularFireStorageModule,// storage
    IonicStorageModule.forRoot(
      {
        name: '_myDb',
        driverOrder: ['localstorage']
      }
    )
  ],
  providers: [
    BLE,
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
