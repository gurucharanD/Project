import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

  private studentLoggedIn:Subject<boolean>=new Subject<boolean>();
  private facultyLoggedIn:Subject<boolean>=new Subject<boolean>();
  private user:Subject<string>=new Subject<string>();
  private year:Subject<string>=new Subject<string>();
  private section:Subject<string>=new Subject<string>();
private userState:boolean;

get userName(){
  return this.user.asObservable();
}

get userSection(){
  return this.section.asObservable();
}
get userYear(){
  return this.year.asObservable();
}

  get isStudentLoggedIn()
  {
    // console.log(typeof this.studentLoggedIn.asObservable() );
    return this.studentLoggedIn.asObservable(); 
  }
  
  get isFacultyLoggedIn()
  {
    return this.studentLoggedIn.asObservable(); 
  }
  

  constructor() { }
  

  setUserName(value){
    this.user.next(value);
  }

  setSection(value){
    this.section.next(value);
  }
  
  setUserYear(value){
    this.year.next(value);
  }

  setStudentLogin(value){
    this.userState=value;
    this.studentLoggedIn.next(value);
  }

  setFacutlyLogin(value){
    this.facultyLoggedIn.next(value);
  }

  getUserState(){
    return this.userState;
  }

}
