import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  filedata ='';
  file:File;
  title ="";
  description ='';
  type ='';
  brightness =100;
  thermometer =100;
  contrast =100;
  water =0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider, public loadingctrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
  handleChanges($event){
    //console.log($event.target.files[0]);
    this.file=$event.target.files[0];
    this.showPreview();
  }
  showPreview(){
    const  reader = new FileReader();
    reader.onloadend=(evt)=>{
      //console.log(reader.result);
      this.filedata =reader.result;
    };
    let f:any =this.file;
    if(this.file.type.includes('video')){
      this.filedata ='http://via.placeholder.com/500x200/00?text=Video';
    }
    else if (this.file.type.includes('audio')){
      this.filedata ='http://via.placeholder.com/500x200/00?text=audio';
    }else{
      reader.readAsDataURL(this.file);
    }
  }
  presentLoadingDefault() {
    let loading = this.loadingctrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 4000);
  }
  upload(){
    //const desc =`<description>${this.description}</description>`;
    //const filters ='<filters> filtersAsText</filters>';
    //show spinner
    const  fd =new FormData();
    fd.append("title",this.title);
    fd.append("description",this.description + ` ${this.brightness}  ${this.thermometer}  ${this.water}  ${this.contrast}`);
    fd.append("file",this.file);
    this.mediaProvider.upload(fd).subscribe(resp=>{
      console.log(resp);
      //set Timeout 2. secs
      this.presentLoadingDefault();
      this.navCtrl.pop().catch();
      //hide spinner
    });
  }
}
