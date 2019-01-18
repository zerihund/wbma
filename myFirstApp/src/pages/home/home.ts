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
  url="http://media.mw.metropolia.fi/wbma/uploads/";
  constructor(public navCtrl: NavController, public http: HttpClient) {

  }
  ngOnInit(){
    this.getImages();
  }
  getImages() {
    this.http.get < pic[]>('http://media.mw.metropolia.fi/wbma/media').subscribe((response:pic[])=>{
        console.log(response);
        this.picArray = response;
    },
      (error)=>{console.log(error)}
      );
  }

}
