import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: pic[] = [];
  url="http://media.mw.metropolia.fi/wbma/uploads/";
  constructor(public navCtrl: NavController, public http: HttpClient,private mediaProvider:MediaProvider) {

  }
  ngOnInit(){
    this.getAllFiles();
  }
  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((response:pic[])=>{
        console.log(response);
        this.picArray = response;
        this.picArray.map(media=>{
          media.thumbnails ={'160':media.filename.split(".")[0] + '-tn160.png'};
        });
    },
      (error)=>{console.log(error)}
      );
  }


}
