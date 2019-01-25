import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginResponse, pic, RegisterResponse, User} from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaAPI ='http://media.mw.metropolia.fi/wbma';
  loggedin = false;
  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }
  getAllMedia() {
    return this.http.get < pic[]>('http://media.mw.metropolia.fi/wbma/media');
  }
  getSingleMedia(id) {
    return this.http.get<pic>('http://media.mw.metropolia.fi/wbma/media/' + id);
  }
  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<LoginResponse>(this.mediaAPI + '/login',
      user, httpOptions);
  }
  registerUser(user:User){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<RegisterResponse>(this.mediaAPI + '/users',
      user, httpOptions);
  }
}
