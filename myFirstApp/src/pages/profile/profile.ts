import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pic, User } from '../../interfaces/Pic';
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
  user: User = { username: null };
  profile:Pic [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    localStorage.clear();
    this.mediaProvider.loggedin = false;
  }

  getProfile() {
    
  }
}
