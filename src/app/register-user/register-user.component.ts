import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {RegisterService} from '../register.service'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})

export class RegisterUserComponent implements OnInit {

  uname : string 
  password: string
  section:string
  year: number
  isRegistered:boolean


  constructor( private _registerService:RegisterService,private router:Router) { }

  ngOnInit() {
  }

  registerUser(){
    
    if(this.uname==''||this.password==''){
      alert("Username/Password cannot be empty");
    }
    else{
      
      var user={
         rollNumber:this.uname,
         password:this.password,
         section:this.section,
         year:this.year
       };
       
       
       this._registerService.registerUser(user)
       .subscribe(res => {

        alert(res.msg);
        this.router.navigate(['home']);
       })
     
  }


}
}
