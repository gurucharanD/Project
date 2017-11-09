import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {LoginService} from '../login-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname:string
  password:string
  isLoggedIn:boolean=false
  year:number
  constructor(private router:Router,private loginService:LoginService) {
    
  }

  ngOnInit() {
    if(Cookie.get("isLoggedIn")=="1")
    this.router.navigate(['dashboard']);
  }


  checkLogin(){
    // validate the user here
    if(this.uname==''||this.password==''){
      alert("Username/Password cannot be empty");
    }
    else{
      var user={
         rollNumber:this.uname,
         password:this.password,
         year:this.year
       };
     
       //validation part


       
       this.loginService.isValidUser(user)
       .subscribe(res => {
          //console.log(res);
         if(res.result==1){
             this.isLoggedIn=true;
          var userDetails=res.userDetails;
          //console.log(userDetails);
        Cookie.set('username', userDetails.rollNumber);
        Cookie.set('isLoggedIn',"1");
        Cookie.set('year',userDetails.year);
          Cookie.set('section',userDetails.section);
         window.location.reload();
        alert("LOGIN SUCCESSFUL");
        this.router.navigate(['dashboard']);
           }
         else{
           this.isLoggedIn=false;
           alert("Invalid USERNAME/PASSWORD/YEAR!");
       }
       })
     }

  }
}
