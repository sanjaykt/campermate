import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-camp-details',
  templateUrl: 'camp-details.html',
})
export class CampDetailsPage {

  campDetailsForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dataService: DataProvider) {

    this.campDetailsForm = this.formBuilder.group({
      gateAccessCode: [''],
      ammenitiesCode: [''],
      wifiPassword: [''],
      phoneNumber: [''],
      departure: [''],
      notes: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampDetailsPage');
  }


  saveForm(): void {
    let data = this.campDetailsForm.value;
    //this.dataService.setCampDetails(data);
  }

}
