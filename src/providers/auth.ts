import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
  private url = 'https://sgp-ane.herokuapp.com';
  public user: any;
  public token: any;
  public headers = new Headers();


  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Auth Provider');

        this.storage.get('user').then((valor) =>{
                                this.user = valor;
                            });

        this.storage.get('token').then((valor) =>{
                                this.token = valor;
                            });
  }



  public login(email: string, password: string): Observable <any> {

        this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let body = 'email=' + email + '&password=' + password;

        return this.http.post(this.url+'/api/auth', body, {headers: this.headers})
                        .map((response: Response) => {
                            // login successful if there's a jwt token in the response
                            if (response.json().accessToken) {
                                
                                // return to indicate successful login
                                return response.json();
                            } else {
                                // return false to indicate failed login
                                return null;
                            }
                        });
    }


    public authenticated() : boolean{
        this.storage.get('user').then((valor) =>{
        this.user = valor;
        });

        this.storage.get('token').then((valor) =>{
        this.token = valor;
        });

        if(this.user != null){
            return true;
        }

        return false
    } 

}
