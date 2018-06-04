import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  tab1Root: any = 'LocationPage';
  tab2Root: any = 'MyDetailsPage';
  tab3Root: any = 'CampDetailsPage';
}
