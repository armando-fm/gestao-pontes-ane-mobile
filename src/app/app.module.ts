import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {Auth} from '../providers/auth';
import {RegistarPontePage} from '../pages/registar-ponte/registar-ponte';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    HomePage,
    RegistarPontePage
  ],
  imports: [
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
    RegistarPontePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, Auth]
})
export class AppModule {}
