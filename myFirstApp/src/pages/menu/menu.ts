import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { MediaProvider } from '../../providers/media/media';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }
  tab1Root = HomePage;
  tab2Root = LoginPage;
  tab3Root = ProfilePage;
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
}
