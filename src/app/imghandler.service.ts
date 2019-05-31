import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path';
import { reject } from 'q';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { url } from 'inspector';
@Injectable({
  providedIn: 'root'
})
export class ImghandlerService {
  imageResponse: any;
  options: any;
  firestore = firebase.storage();
  constructor(private imagePicker: ImagePicker) { }
  uploadimage() {
     /* var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                  imageStore.put(imgBlob).then((res) => {
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                      resolve(url);
                    }).catch((err) => {
                        reject(err);
                    })
                  }).catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })    
     return promise;   
  } 
 */
  var promise=new Promise((resovle,reject)=>{
    this.options={
      width:200,
      quality:25,
      outputType:1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((res)=>{
      this.imageResponse.push('data:image/jpeg;base64'+res);
      var imageStore=this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
      imageStore.put(this.imageResponse[0]).then((res)=>{
        this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url)=>{
          resovle(url);
        }).catch((error)=>{
          reject(error)
        })
      })
  })
  })
  return promise;
}
}
