import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interfaces/Pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Observable<Pic[]>;
  url = 'http://media.mw.metropolia.fi/wbma/uploads/';
  constructor(
    public navCtrl: NavController, public http: HttpClient,
    private mediaProvider: MediaProvider) {
  }
  ngOnInit() {
    this.getAllFiles();
  }
  getAllFiles() {
    this.picArray = this.mediaProvider.getAllMedia();
  }
}
