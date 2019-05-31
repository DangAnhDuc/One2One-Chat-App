import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  newuser={
    email:'',
    password:'',
    displayName: ''
  }
  toaster: any;
  constructor(public navCtrl:NavController,public router:Router,public loadingCtrl:LoadingController,public userservice:UserService,public toastCtrl:ToastController) { }

  ngOnInit() {
  }

  async signUp(){
    if(this.newuser.email==''||this.newuser.password==''||this.newuser.displayName==''){
      this.toaster=this.toastCtrl.create({
        message: "All fields are required dude",
        duration: 3000,
        position:  'bottom'
      }).then((toastData)=>{
        toastData.present()
      })
    }
    else if(this.newuser.password.length<7){
      this.toaster=this.toastCtrl.create({
        message:"Password is not strong. Try giving more than six characters",
        duration:3000,
        position: 'bottom'
      }).then((toasData)=>{
        toasData.present()
      })
    }
    else {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait',
        duration: 2000
      });
      await loading.present();

      this.userservice.adduser(this.newuser).then((res:any)=>{
        loading.dismiss();
        if(res.success)
          this.router.navigateByUrl('tabs')
        else
          alert('Error'+res)
      })
    }
  }
  goBack(){
    this.router.navigateByUrl('login')
  }
}
