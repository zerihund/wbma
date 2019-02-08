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
  filedata = '';
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
              public loadingctrl: LoadingController,
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
      this.filedata = reader.result;
    };
    const f: any = this.file;
    if (this.file.type.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500x200/00?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500x200/00?text=audio';
    } else {
      reader.readAsDataURL(this.file);
    }
  }*/
  presentLoadingDefault() {
    const loading = this.loadingctrl.create({
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
    if (this.file === undefined || this.title === undefined ) {
      this.showAlert('Please fill the form properly');
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
        this.filedata = 'http://via.placeholder.com/500x200/00?text=Video';
      } else if (file.mediaType.includes('audio')) {
        this.filedata = 'http://via.placeholder.com/500x200/00?text=audio';
      } else if (file.mediaType.includes('image')) {
        this.showFilters = true;
        this.filedata = file.dataURI;
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
    this.filedata = '';
    this.showFilters = false;
  };

}
