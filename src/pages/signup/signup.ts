import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";

import {TabsPage} from '../tabs/tabs';
import {Login} from "../login/login";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class Signup {
  resposeData : any;
  userData = {"username":"", "password":"","email":"","name":""};
  constructor(public navCtrl : NavController, public authService : AuthService, private toastCtrl:ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup() {
    if(this.userData.username && this.userData.password && this.userData.email && this.userData.name){
      //Api connections
      console.log(' Signup.........');
    this.authService.postData(this.userData, "users").then((result) =>{
      console.log("res"+JSON.stringify(result));
    this.resposeData = result;//JSON.parse(JSON.stringify(result));
    if(this.resposeData.userData){
        console.log(' Signup2.........');
      console.log("data"+JSON.stringify(result));
      localStorage.setItem('userData', JSON.stringify(result));
      this.navCtrl.push(TabsPage);
    }



    else{
        console.log(' SignupError.........');
      this.presentToast("Please give valid username and password");
    }

    }, (err) => {
        console.log(' Signup failed.........');
      //Connection failed message
    });
  }
  else {
    console.log("Give valid information.");
  }

  }

  login() {
    this
      .navCtrl
      .push(Login);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
