import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from '../../interfaces/pic';
import {MediaProvider} from '../../providers/media/media';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  user:User ={username:null};
  constructor(public navCtrl: NavController, public navParams: NavParams,public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    this.mediaProvider.loggedin =false;
  }

}
