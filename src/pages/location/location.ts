import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {DataProvider} from "../../providers/data/data";
import {Geolocation} from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public maps: GoogleMapsProvider,
              public platform: Platform,
              public dataService: DataProvider,
              public alertCtr: AlertController,
              public geolocation: Geolocation) {
  }

  ionViewDidLoad(): void {
    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
      //this.maps.changeMarker(this.latitude, this.longitude)
    });
  }

  setLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.maps.changeMarker(position.coords.latitude, position.coords.longitude);

      let data = {
        latitude: this.latitude,
        longitude: this.longitude
      };

      //this.dataService.setLocation(data);

      let alert = this.alertCtr.create({
        title: 'Location set!',
        message: '\'You can now find your way back to your camp site from anywhere by clicking the button in the top right corner.',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present();
    })
  }

  takeMeHome(): void {

    if(!this.latitude || !this.longitude) {
      let alert = this.alertCtr.create({
        title: 'Nowhere to go!',
        message: 'You need to set your camp location first. For now, want to launch Maps to find your own way home?',
        buttons: ['Ok']
      });
      alert.present();
    }
    else {
      let destination = this.latitude + ',' + this.longitude;

      if(this.platform.is('ios')) {
        window.open('maps://?q=' + destination, '_system')
      }
      else {
        let label = encodeURI('My Campsite');
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
      }
    }
  }

}
