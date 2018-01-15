import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }
  
  isStudentLoggedIn:boolean
  isFacultyLoggedIn:boolean

  setStudentLogin(){
    this.isStudentLoggedIn=!this.isStudentLoggedIn;
  }

  setFacutlyLogin(){
    this.isFacultyLoggedIn=!this.isFacultyLoggedIn;
  }


}
