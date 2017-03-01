import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import {Camera, Geolocation} from 'ionic-native';

import {HomePage} from '../home/home'
import {DistritoService, Auth, EstradaService, TipoDePonteService, PonteService} from '../../providers/index'

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
  public tipo_id: any;
  public obstaculo_tipo : any;
  public obstaculo_loc : any;
  public estado_ponte : any;
  public lat_inicio: any;
  public lng_inicio: any;
  public lat_fim: any;
  public lng_fim: any;
  public distrito_id: any;
  public estrada_id: any;  
  public distritos: any[];
  public estradas: any[];
  public tipos: any[];
  loading: Loading;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private distritoService: DistritoService,
              private estradaService: EstradaService,
              private tipoDePonteService: TipoDePonteService,
              private auth: Auth,
              private ponteSerice: PonteService 
              ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistarPontePage');
  }

  ngOnInit(){
   
      this.getDistritos();
      this.getEstradas();
      this.getTiposDeponte();
  }

  getTiposDeponte(){

    this.tipoDePonteService.getTodosTipos(this.auth.token).subscribe(resultado => {

      if(resultado){
      this.tipos = resultado;
    }
      else
        alert('Erro');

    },  error => {
              console.log(error);}
            );
  }

  getDistritos():void{
    this.distritoService.getTodosDistritos(this.auth.token).subscribe(resultado => {

      if(resultado)
      this.distritos = resultado;
      else
        alert('Erro');

    },  error => {
              console.log(error);}
            );
  }

  getEstradas(){

    this.estradaService.getTodasEstradas(this.auth.token).subscribe(resultado => {

      if(resultado)
      this.estradas = resultado;
      else
        alert('Erro');

    },  error => {
              console.log(error);}
            );
  }


  getLatInicio():void{
          Geolocation.getCurrentPosition().then((resp) => {
          this.lat_inicio = resp.coords.latitude;
          }).catch((error) => {
            console.log('Erro ao Pegar latitude de inicio', error);
      });
  }

   getLngInicio():void{
          Geolocation.getCurrentPosition().then((resp) => {
          this.lng_inicio = resp.coords.longitude;
          }).catch((error) => {
            console.log('Erro ao Pegar longitude de inicio', error);
      });
  }



  getLatFim():void{
          Geolocation.getCurrentPosition().then((resp) => {
          this.lat_fim = resp.coords.latitude;
          }).catch((error) => {
            console.log('Erro ao Pegar latitude de fim', error);
      });
  }


   getLngFim():void{
          Geolocation.getCurrentPosition().then((resp) => {
          this.lng_fim = resp.coords.longitude;
          }).catch((error) => {
            console.log('Erro ao Pegar longitude de fim', error);
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


  gravarPonte(nome_ponte, ano_construcao, lat_inicio,lng_inicio,lat_fim,lng_fim, tipo_obstaculo, loc_obstaculo, estado_ponte, distrito_id, estrada_id, tipo_id){
     this.showLoading();

    let ponte : any = {'nome_ponte' : nome_ponte,
                    'ano_construcao' : ano_construcao,
                    'lat_inicio': lat_inicio,
                    'lng_inicio' : lng_inicio,
                    'lat_fim': lat_fim,
                    'lng_fim': lng_fim,
                    'tipo_obstaculo' : tipo_obstaculo,
                    'local_obstaculo': loc_obstaculo,
                    'estado_ponte': estado_ponte,
                    'distrito_id': distrito_id,
                    'estrada_id': estrada_id,
                    'tipo_id': tipo_id
                  };

    this.ponteSerice.createPonte(this.auth.token, ponte).subscribe(resultado => {
                
                    if(resultado){
                      setTimeout(() => {
                      this.loading.dismiss();
                      this.presentToast(''+resultado.msg);
                      this.navCtrl.setRoot(HomePage);
                      });
                    }
                    else {
                      this.showError("Erro ao tentar registar");
                    }
            },
            error => {
              this.showError(error);
            });;

    
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
