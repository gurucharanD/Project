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
  secretKey:string
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
      alert(this.uname+" "+this.password+" ");
      var user={
         rollNumber:this.uname,
         password:this.password,
         secretKey:this.secretKey,
         year:this.year
       };
       
       
       this._registerService.registerUser(user)
       .subscribe(res => {
         if(res.result==1){
             this.isRegistered=true;
              alert("Registration Successful");
         this.router.navigate(['home']);
           }
         else{
           this.isRegistered=false;
           alert("Registration Unsuccessful");
         }
       })
     
  }


}
}
