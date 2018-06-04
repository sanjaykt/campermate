import {Injectable} from '@angular/core';
import {ConnectivityProvider} from "../connectivity/connectivity";
import {Geolocation} from "@ionic-native/geolocation";

declare var google: any;

@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyC_KC7bsl-kNZTYXm4JUxLtFrp3TNYUAnA"

  constructor(public conectivityService: ConnectivityProvider,
              public geolocation: Geolocation) {
    console.log('Hello GoogleMapsProvider Provider');
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.conectivityService.isOnline()) {
          window['mapInit'] = () => {
            this.initMap().then(() => {
              resolve(true);
            });
            this.enableMap();
          };

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'https://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'https://maps.google.com/maps/api/js?callback=mapInit';
          }
          document.body.appendChild(script);
        }
      } else {
        if (this.conectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        } else {
          this.disableMap();
        }
      }
      this.addConnectivityListeners();
    });
  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {center: latLng, zoom: 15, mytypeId: google.maps.MapTypeId.ROADMAP};

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
      });
    });
  }

  disableMap(): void {
    if(this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if(this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.conectivityService.watchOnline().subscribe(() => {
      console.log("online");

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    });

    this.conectivityService.watchOffline().subscribe(() => {
      console.log("offline");
      this.disableMap();
    });
  }

  changeMarker(lat: number, lng: number): void {
    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
      });

    if(this.currentMarker) {
      this.currentMarker.setMap(null);
    }

    this.currentMarker = marker;

  }


}
