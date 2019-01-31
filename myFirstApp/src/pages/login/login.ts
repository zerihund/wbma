import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginResponse, RegisterResponse, User } from '../../interfaces/Pic';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = { username: null };

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaProvider.loggedin = true;
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('email',response.user.email);
        localStorage.setItem('user_id',String(response.user.user_id));
        console.log("UserId");
        console.log(localStorage.getItem('user_id'));
        this.navCtrl.parent.select(0);

      },
      error => {
        console.log(error);
      });
  }
  registerUser() {
      this.mediaProvider.registerUser(this.user).subscribe(
        (response: RegisterResponse) => {
        console.log(response);
        this.mediaProvider.loggedin = true;
        this.navCtrl.parent.select(0);
      },
          error => {
            console.log(error);
          });
  }
}
