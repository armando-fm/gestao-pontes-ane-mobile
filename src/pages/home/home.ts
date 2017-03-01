import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Auth,PonteService} from '../../providers/index';

import {PonteDetalhesPage} from '../ponte-detalhes/ponte-detalhes'

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private pontes: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: Auth,
              public ponteService: PonteService
              ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit(){
   
      this.getPontes();
  }

  getPontes(){

    this.ponteService.getTodasPontes(this.auth.token).subscribe(resultado => {

      if(resultado){
      this.pontes = resultado;
    }
      else
        alert('Erro ao buscar pontes');

    },  error => {
              console.log(error);}
            );
  }

  itemTapped(item) {
    this.navCtrl.push(PonteDetalhesPage, {
      ponte: item
    });
  }

}
