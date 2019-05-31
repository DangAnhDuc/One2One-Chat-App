import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { resolve } from "path";
import { error } from "@angular/compiler/src/util";
import { reject } from "q";

@Injectable({
  providedIn: "root"
})
export class UserService {
  firedata = firebase.database().ref("/users");
  constructor(public fireauth: AngularFireAuth) {}

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.fireauth.auth
        .createUserWithEmailAndPassword(newuser.email, newuser.password)
        .then(() => {
          this.fireauth.auth.currentUser
            .updateProfile({
              displayName: newuser.displayName,
              photoURL: ""
            })
            .then(() => {
              this.firedata
                .child(this.fireauth.auth.currentUser.uid)
                .set({
                  uid: this.fireauth.auth.currentUser.uid,
                  displayName: newuser.displayName,
                  photoURL: "https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/55483199_1178208115672705_8939303368048771072_o.jpg?_nc_cat=104&_nc_ht=scontent.fsin8-2.fna&oh=b40e67e578d100113648bb501db9619b&oe=5D74F061"
                })
                .then(() => {
                  resolve({ success: true });
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ success: true });
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.fireauth.auth.currentUser
        .updateProfile({
          displayName: this.fireauth.auth.currentUser.displayName,
          photoURL: imageurl
        })
        .then(() => {
          firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .update({
              displayName: this.fireauth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }
  
getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
