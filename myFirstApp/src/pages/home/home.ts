import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { pic } from '../../interfaces/pic';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: pic[] = [];
  constructor(public navCtrl: NavController, public http: HttpClient) {

  }
  ngOnInit(){
    this.getImages();
  }
  getImages() {
    this.http.get < pic[]>('/assets/test.json').subscribe((response:pic[])=>{
       this.picArray = response;
    },
      (error)=>{console.log(error)}
      );
  }

}
