import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor(private http:Http) { }

isValidUser(user){
   var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/studentLogin',JSON.stringify(user),{headers:headers})
  .map(res=>res.json()); 
  }

facultyLogin(user){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/facultyLogin',JSON.stringify(user),{headers:headers})
  .map(res=>res.json()); 
}

postQuestion(question){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('api/postQuestion',JSON.stringify(question),{headers:headers})
  .map(res=>res.json()); 
}


}