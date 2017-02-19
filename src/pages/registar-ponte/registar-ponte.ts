import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Camera, Geolocation} from 'ionic-native';

/*
  Generated class for the RegistarPonte page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registar-ponte',
  templateUrl: 'registar-ponte.html'
})
export class RegistarPontePage implements OnInit {
  public tipo: string = '';
  public obstaculo_tipo : string = '';
  public obstaculo_loc : string = '';
  public estado_ponte : string ='';
  public lat: any;
  public lng: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistarPontePage');
  }

  ngOnInit(){

      Geolocation.getCurrentPosition().then((resp) => {
          this.lat = resp.coords.latitude
          this.lng = resp.coords.longitude
          }).catch((error) => {
            console.log('Erro ao Pegar localização', error);
      });

  }


  capturarImg(){

    let options: {saveToPhotoAlbum: true};

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }


}
