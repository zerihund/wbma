import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Chooser } from '@ionic-native/chooser';

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
  fileData = '';
  file: File;
  myBlob: Blob;
  title = '';
  description = '';
  type = '';
  brightness = 100;
  thermometer = 100;
  contrast = 100;
  water = 0;
  showFilters = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController,
              public chooser: Chooser,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
  /*handleChanges($event) {
    // console.log($event.target.files[0]);
    this.file = $event.target.files[0];
    this.showPreview();
  }
  showPreview() {
    const  reader = new FileReader();
    reader.onloadend = (evt) => {
      // console.log(reader.result);
      this.fileData = reader.result;
    };
    const f: any = this.file;
    if (this.file.type.includes('video')) {
      this.fileData = 'http://via.placeholder.com/500x200/00?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.fileData = 'http://via.placeholder.com/500x200/00?text=audio';
    } else {
      reader.readAsDataURL(this.file);
    }
  }*/
  presentLoadingDefault() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 4000);
  }
  upload() {
    // const desc =`<description>${this.description}</description>`;
    // const filters ='<filters> filtersAsText</filters>';
    // show spinner
    console.log('where are')
    console.log(this.description,this.file,this.title);

    if (this.title === '' || this.description === '') {
      this.showAlert('Please fill the form correctly!');
    } else {
      const  fd = new FormData();
      fd.append('title', this.title);
      fd.append('description', this.description + ` ${this.brightness}  ${this.thermometer}  ${this.water}  ${this.contrast}`);
      fd.append('file', this.myBlob);
      this.mediaProvider.upload(fd).subscribe(resp => {
        console.log(resp);
        // set Timeout 2. secs
        this.presentLoadingDefault();
        this.navCtrl.pop().catch();
        // hide spinner
      });
    }
  }
  chooseFile() {
    this.chooser.getFile('image/video/audio')
    .then(file => {
      this.myBlob = new Blob([file.data], { type: file.mediaType });
      if (!file.mediaType.includes('image')) {
        this.showFilters = false;
      } else if (file.mediaType.includes('video')) {
        this.fileData = 'http://via.placeholder.com/500x200/00?text=Video';
      } else if (file.mediaType.includes('audio')) {
        this.fileData = 'http://via.placeholder.com/500x200/00?text=audio';
      } else if (file.mediaType.includes('image')) {
        this.showFilters = true;
        this.fileData = file.dataURI;
      }
      }).catch((error: any) => console.error(error));
  }
  takePhoto() {

  }
  showAlert(notice: string) {
    const alert = this.alertCtrl.create({
      title: 'NOTICE',
      subTitle: notice,
      buttons: ['OK'],
    });
    alert.present();
  }
  reset()  {
    this.title = '';
    this.description = '';
    this.fileData = '';
    this.showFilters = false;
  }

}
