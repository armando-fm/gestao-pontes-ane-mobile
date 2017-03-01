import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PonteDetalhes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ponte-detalhes',
  templateUrl: 'ponte-detalhes.html'
})
export class PonteDetalhesPage {
  ponteSelecionada: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

     this.ponteSelecionada = navParams.get('ponte');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PonteDetalhesPage');
  }

}
