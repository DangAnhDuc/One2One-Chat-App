import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})
export class PasswordresetPage implements OnInit {
  email: string;
  constructor(public navCtrl:NavController,public router:Router,public userservice:UserService,public alertCtrl:AlertController) { }

  ngOnInit() {
  }

  reset(){
    this.userservice.passwordreset(this.email).then(async (res:any)=>{
      if(res.success){
        const alert = await this.alertCtrl.create({
          header: 'Email Sent',
          message: 'Please follow the instructions in the email to reset your password',
          buttons: ['OK']
        });
        await alert.present();
      }
      else{
        const alert = await this.alertCtrl.create({
          header: 'Faild',
          buttons: ['OK']
        });
        await alert.present();
      }
    })
  }
  goBack(){
    this.router.navigateByUrl('login')
  }
}
