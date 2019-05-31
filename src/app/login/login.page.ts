import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { usercreds } from '../models/interfaces/usercreds';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials={} as usercreds;
  constructor(public navCtrl: NavController,public authservice:AuthService,public router:Router) { }

  ngOnInit() {
    console.log('ionviewDid Load')
  }

  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code)
        this.router.navigateByUrl('tabs');
      else
        alert(res);
    })
  }

  passwordreset() {
    this.router.navigateByUrl('passwordreset')
  }
   
  signup() {
    this.router.navigateByUrl('signup')
  }
}
