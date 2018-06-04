import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-my-details',
  templateUrl: 'my-details.html',
})
export class MyDetailsPage {

  myDetailsForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dataService: DataProvider) {

    this.myDetailsForm = this.formBuilder.group({
      carRegistration: [''],
      trailerRegistration: [''],
      trailerDimensions: [''],
      phoneNumber: [''],
      notes: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDetailsPage');
  }

  saveForm(): void {
    let data = this.myDetailsForm.value;
    //this.dataService.setMyDetails(data);
  }

}
