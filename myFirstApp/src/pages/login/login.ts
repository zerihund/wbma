import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController , NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import {
  LoginResponse,
  RegisterResponse,
  User,
  UserExists,
} from '../../interfaces/Pic';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';



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
  @ViewChild('username') usernameInput;
  userAlert = false;
  user: User = { username: null };
  showRegister = false;
  confirmPassword = '';
  validUsername = false;
  validFullName = false;
  validPassword = false;
  validEmail =false;
 // myGroup: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder
              ) {
    /*this.myGroup = formBuilder.group({
      fullName: [null, Validators.compose([Validators.minLength(3),Validators.pattern('[a-zA-z]*')])],
      userName: [null,Validators.compose([Validators.minLength(3),Validators.pattern('[a-zA-Z0-9]*'),Validators.required])],
      email1: [null,Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      passWord: [null,Validators.compose([Validators.minLength(5),Validators.required])]
    });*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  swapLoginRegister() {
    this.showRegister = !this.showRegister;
  }
  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['ok'],
    });
    alert.present().catch();
  }
  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaProvider.loggedin = true;
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('user_id', String(response.user.user_id));
        console.log('UserId');
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
  validName(){
    const pattern = /[a-zA-z]$/;
    if(!pattern.test(this.user.full_name)){
        this.validFullName = true;
    }
    else{
      this.validFullName =false;
    }
  }
  checkUserExists() {
    this.mediaProvider.checkUser(this.user.username).subscribe((data: UserExists) => {
      console.log(data.available);
      if (!data.available) {
        this.userAlert = true;
        this.usernameInput = true;
        // this.showAlert('The user already exists');
      } else {
        this.userAlert = false;
      }
    });
    if(this.user.username.length<3){
      this.validUsername =true;
    }
    else{
      this.validUsername =false;
    }
  }
  emailCheck(){
    const pattern =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(this.user.email.length < 5 || pattern.test(this.user.email)){
      this.validEmail = true;
    }
    else{
      this.validEmail =false;
    }
  }
  passwordCheck(){
    if(this.user.password.length<5){
      this.validPassword =true;
    }
    else{
      this.validPassword = false;
    }
  }
  passWordMatch() {
    if (this.user.password !== this.confirmPassword) {
      this.showAlert('Password do not match!');
    }
}
}

