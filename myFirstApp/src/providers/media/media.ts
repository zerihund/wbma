import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse,
  RegisterResponse,
  UserExists,
  User,
  Pic, UploadResponse,
} from '../../interfaces/Pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaAPI = 'http://media.mw.metropolia.fi/wbma';
  imageUrl ='http://media.mw.metropolia.fi/wbma/uploads/';
  loggedin = false;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    console.log('Getallmedia called');
    return this.http.get <Pic[]>('http://media.mw.metropolia.fi/wbma/media');
  }

  getSingleMedia(id) {
    return this.http.get<Pic>('http://media.mw.metropolia.fi/wbma/media/' + id);
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + '/login',
      user, httpOptions);
  }

  registerUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<RegisterResponse>(this.mediaAPI + '/users',
      user, httpOptions);
  }
  getFileByTag(tag){
    return this.http.get<Pic[]>(this.mediaAPI + '/tags/' + tag);
  }
  checkUser(username){
    return this.http.get<UserExists>(this.mediaAPI +'/users/username/' + username);
  }
  upload(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<UploadResponse>(this.mediaAPI + '/media',
      data, httpOptions);
  }
  getUserName(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(this.mediaAPI + '/users/'+id, httpOptions);
  }
  /*generateDetailInfo(mediaInfo: Pic) {
    const descriptionObj = JSON.parse(mediaInfo.description);
    const description = descriptionObj.description;
    const filters = descriptionObj.filters;

    let detailInfo = descriptionObj;
    detailedMedia = { description: description, filters: filters };

    return detailInfo;
  }*/

}
