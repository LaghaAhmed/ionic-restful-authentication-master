import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = "http://localhost/PHP-Slim-Restful/api/";
let apiUrl = 'http://localhost:4000/api/';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      console.log("auth-service"+JSON.stringify(credentials));
      this.http.post(apiUrl+type, credentials, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
        console.log("auth-service2"+JSON.stringify(credentials));
      });

    });

  }

}
