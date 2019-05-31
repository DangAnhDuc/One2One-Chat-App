import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ImghandlerService } from '../imghandler.service';

@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.page.html',
  styleUrls: ['./profilepic.page.scss'],
})
export class ProfilepicPage implements OnInit {
  imgurl='https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/55483199_1178208115672705_8939303368048771072_o.jpg?_nc_cat=104&_nc_ht=scontent.fsin8-2.fna&oh=b40e67e578d100113648bb501db9619b&oe=5D74F061'
  moveon = true;
  constructor(public navCtrl:NavController,public userservice: UserService,public loadingCtrl: LoadingController,
    public imgservice: ImghandlerService,public zone: NgZone,public router:Router) { }

  ngOnInit() {
  }

  async chooseimage() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait',
    })
    await loading.present();
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      loading.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }

  async updateproceed() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait',
    })
    await loading.present();
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loading.dismiss();
      if (res.success) {
        this.router.navigateByUrl('tabs');
      }
      else {
        alert(res);
      }
    })
  }
 
  proceed() {
    this.router.navigateByUrl('tabs');
  }
}
