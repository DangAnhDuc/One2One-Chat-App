import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import{usercreds} from '../app/models/interfaces/usercreds'
import { resolve, reject } from 'q';
import { error } from 'util';
import { promise } from 'protractor';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firedata = firebase.database().ref("/users");

  constructor(public fireauth:AngularFireAuth) { 
    
  }
  login(credentials: usercreds){
      var promise= new Promise((resolve,reject)=>{
      this.fireauth.auth.signInWithEmailAndPassword(credentials.email,credentials.password).then(()=>{
        resolve(true);
      }).catch((error)=>{
        reject(error);
      })
      })
    return promise;
  }


}
