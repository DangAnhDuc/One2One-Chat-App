import { Component, OnInit } from "@angular/core";
import { NavController, Events, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { RequestsService } from "../requests.service";
import { ChatService } from '../chat.service';

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"]
})
export class ChatsPage implements OnInit {
  buddy:any;
  myrequests;
  myfriends;
  constructor(
    public navCtrl: NavController,
    public router: Router,
    public requestservice: RequestsService,
    public events: Events,
    public alertCtrl: AlertController,
    public chatservice:ChatService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe("gotrequests", () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    });
    this.events.subscribe("friends", () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe("gotrequests");
  }
  addbuddy() {
    this.router.navigateByUrl("buddies");
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(async () => {
      const alert = await this.alertCtrl.create({
        header: "Friend added",
        message: "Tap on the friend to chat with him",
        buttons: ["OK"]
      });

      await alert.present();
    });
  }

  ignore(item) {
    this.requestservice
      .deleterequest(item)
      .then(() => {
        alert("Request ignored");
      })
      .catch(error => {
        alert(error);
      });
  }

  
  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.router.navigateByUrl('buddychat')
  }
}
