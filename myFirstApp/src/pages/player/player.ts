import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Pic } from '../../interfaces/Pic';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  file: Pic;
  type = '';
 // description = '';
  /*brightness = 100;
  thermometer = 100;
  contrast = 100;
  water = 0;*/
  showFilters = false;
  user_name='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
    console.log('ionViewDidLoad PlayerPage');

  }

  ionViewWillEnter() {
    this.getInfo();
  }
 getInfo()
 {
   console.log('ionViewDidLoad PlayerPage');
   this.mediaProvider.getSingleMedia(this.navParams.get('file_id')).subscribe((file: Pic) => {
     console.log('what is this?');
     console.log(file);
     this.mediaProvider.getUserName(file.user_id).subscribe(res =>{
       console.log('Check user name');
       console.log(res);
       this.user_name = res.username;
     },err =>{});
     this.file = file;
     this.type = file.media_type;
   });
 }
}
