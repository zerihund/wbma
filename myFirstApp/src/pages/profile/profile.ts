import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  Pic, User } from '../../interfaces/Pic';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userName:string ;
  userEmail:string;
  profile: Pic [];
  avatar: string;
  url = 'http://media.mw.metropolia.fi/wbma/uploads/';
  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.getProfile();
    console.log('ionViewDidLoad ProfilePage');
    this.logout();
    /*localStorage.clear();
    this.mediaProvider.loggedin = false;*/
  }

  getProfile() {
      this.userName =localStorage.getItem('username');
      this.userEmail =localStorage.getItem('email');
      console.log("email");
      console.log(this.userEmail);
    console.log(localStorage.getItem('user_id'));
    const myUserId =localStorage.getItem('user_id')
      this.mediaProvider.getFileByTag('profile').subscribe((file:Pic[])=>{
        //console.log(file);

        file.forEach((item:Pic)=>{
          console.log('something');
          console.log(item.user_id);

          if (item.user_id.toString() === myUserId){
            this.avatar = item.file_id.toString();
            console.log('avatars is here:');
            console.log(this.avatar);
          }
        });
      });
  }
  logout(){
    localStorage.clear();
    this.mediaProvider.loggedin =false;
    console.log('you are logged out');
    this.navCtrl.parent.select(0);
  }
}
