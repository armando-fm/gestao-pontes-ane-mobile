import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the EstradaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EstradaService {
  private url = 'https://sgp-ane.herokuapp.com';
  public headers = new Headers();

  constructor(public http: Http) {
    console.log('Hello EstradaService Provider');
  }


  getTodasEstradas(token : any) : Observable<any>{

  this.headers = new Headers({'Accept': 'application/json', 'Authorization':'Bearer '+token.accessToken});
  return this.http.get(this.url+'/api/todas-estradas', {headers: this.headers})
                  .map((response : Response) =>{

                    if (response.json()) {
                                
                                // return to indicate successful login
                                return response.json();
                            } else {
                                // return false to indicate failed login
                                return null;
                            }

                  });

}

}
