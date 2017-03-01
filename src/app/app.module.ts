import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {RegistarPontePage} from '../pages/registar-ponte/registar-ponte';
import {PonteDetalhesPage} from '../pages/ponte-detalhes/ponte-detalhes'

import {DistritoService, Auth, EstradaService, TipoDePonteService, PonteService} from '../providers/index'


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    HomePage,
    RegistarPontePage,
    PonteDetalhesPage
  ],
  imports: [
     HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    HomePage,
    RegistarPontePage,
    PonteDetalhesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, Auth, DistritoService, EstradaService, TipoDePonteService, PonteService]
})
export class AppModule {}
