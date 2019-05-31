import { Component, OnInit, NgZone } from "@angular/core";
import { NavController, AlertController } from "@ionic/angular";
import { UserService } from "../user.service";
import { ImghandlerService } from "../imghandler.service";
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  avatar: string;
  displayName: string;
  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public router:Router
  ) {}

  ngOnInit() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      });
    });
  }

  
   
  
  logout(){
    firebase.auth().signOut().then(() => {
      this.router.navigateByUrl('login')
    })
  }
}
