import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { NavController, AlertController } from "@ionic/angular";
import * as firebase from "firebase";
import { connreq } from "../models/interfaces/request";
import { RequestsService } from "../requests.service";

@Component({
  selector: "app-buddies",
  templateUrl: "./buddies.page.html",
  styleUrls: ["./buddies.page.scss"]
})
export class BuddiesPage implements OnInit {
  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];
  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public alertCtrl: AlertController,
    public requestservice: RequestsService
  ) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    });
  }

  ngOnInit() {}

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == "") {
      return;
    }

    this.filteredusers = this.filteredusers.filter(v => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient) {
      alert("You are your friend always");
    } else {
      this.requestservice
        .sendrequest(this.newrequest)
        .then(async (res: any) => {
          if (res.success) {
            const successalert = await this.alertCtrl.create({
              header: "Request sent",
              message: "Your request was sent to " + recipient.displayName,
              buttons: ["ok"]
            });
            await successalert.present();
            let sentuser = this.filteredusers.indexOf(recipient);
            this.filteredusers.splice(sentuser, 1);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }
}
