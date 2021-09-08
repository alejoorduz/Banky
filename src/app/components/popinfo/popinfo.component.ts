import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  constructor(public router: Router, private pop: PopoverController) { }

  ngOnInit() {}


  navigate(route: string){
    this.router.navigate([route]);
    this.pop.dismiss();
  }

 

}
