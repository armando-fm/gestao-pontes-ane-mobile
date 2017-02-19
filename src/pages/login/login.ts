import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {HomePage} from '../home/home';
import {Storage} from '@ionic/storage';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: Auth, 
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage: Storage
              ) {}
  
  loading: Loading;
  public user: any


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(email: string, password: string) {
    this.showLoading();

    this.auth.login(email, password).subscribe(resultado => {
                
                    if(resultado){
                      setTimeout(() => {
                        this.storage.set('token',  resultado.accessToken);
                      this.storage.set('user',  resultado.user);
                      this.loading.dismiss();
                      this.presentToast('Bem vindo ao SGP-ANE');
                      this.navCtrl.setRoot(HomePage);
                      });
                    }
                    else {
                      this.showError("Accesso Recusado");
                    }
            },
            error => {
              this.showError(error);
            });


  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });
    this.loading.present();
  }


   showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Falha',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  

}
