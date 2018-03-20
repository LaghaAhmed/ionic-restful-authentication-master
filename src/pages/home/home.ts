import { Component, ViewChild } from "@angular/core";
import { NavController, App, AlertController } from "ionic-angular";
import { AuthService } from "../../providers/auth-service";
import { Common } from "../../providers/common";

import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";

@Component({ selector: "page-home", templateUrl: "home.html" })
export class HomePage {
  @ViewChild("updatebox") updatebox;
  option: BarcodeScannerOptions;
  encodeText:string='';
  encodeData:any={};
  scannedData:any={};
  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;
  userPostData = {
    username: "",
    email: ""
  };

  constructor(
    public common: Common,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public app: App,
    public authService: AuthService,
    public scanner:BarcodeScanner
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log("homeData"+JSON.stringify(data));
    this.userDetails = data.userData;
    this.userPostData.username = this.userDetails.username;
    console.log("homeDataUserName"+this.userPostData.username);
    this.userPostData.email = this.userDetails.email;
    //this.getFeed();
  }
  encode(){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodeText).then(
      (data) => {this.encodeData = data}, (err) =>{}
    );
  }

/*  getFeed() {
    this.common.presentLoading();
    this.authService.postData(this.userPostData, "feed").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.common.closeLoading();
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);

          const dataLength = this.resposeData.feedData.length;

          this.userPostData.lastCreated = this.resposeData.feedData[
            dataLength - 1
          ].created;
        } else {
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  feedUpdate() {
    if (this.userPostData.feed) {
      this.common.presentLoading();
      this.authService.postData(this.userPostData, "feedUpdate").then(
        result => {
          this.resposeData = result;
          if (this.resposeData.feedData) {
            this.common.closeLoading();
            this.dataSet.unshift(this.resposeData.feedData);
            this.userPostData.feed = "";

            //this.updatebox.setFocus();
            setTimeout(() => {
              //  this.updatebox.focus();
            }, 150);
          } else {
            console.log("No access");
          }
        },
        err => {
          //Connection failed message
        }
      );
    }
  }

  feedDelete(feed_id, msgIndex) {
    if (feed_id > 0) {
      let alert = this.alertCtrl.create({
        title: "Delete Feed",
        message: "Do you want to buy this feed?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "Delete",
            handler: () => {
              this.userPostData.feed_id = feed_id;
              this.authService.postData(this.userPostData, "feedDelete").then(
                result => {
                  this.resposeData = result;
                  if (this.resposeData.success) {
                    this.dataSet.splice(msgIndex, 1);
                  } else {
                    console.log("No access");
                  }
                },
                err => {
                  //Connection failed message
                }
              );
            }
          }
        ]
      });
      alert.present();
    }
  }



  doInfinite(e): Promise<any> {
    console.log("Begin async operation");
    return new Promise(resolve => {
      setTimeout(() => {
        this.authService.postData(this.userPostData, "feed").then(
          result => {
            this.resposeData = result;
            if (this.resposeData.feedData.length) {
              const newData = this.resposeData.feedData;
              this.userPostData.lastCreated = this.resposeData.feedData[
                newData.length - 1
              ].created;

              for (let i = 0; i < newData.length; i++) {
                this.dataSet.push(newData[i]);
              }
            } else {
              this.noRecords = true;
              console.log("No user updates");
            }
          },
          err => {
            //Connection failed message
          }
        );
        resolve();
      }, 500);
    });
  }

  converTime(time) {
    let a = new Date(time * 1000);
    return a;
  }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    //Api Token Logout

    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }*/
}
