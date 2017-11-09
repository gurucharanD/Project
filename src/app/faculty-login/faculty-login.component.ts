import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {LoginService} from '../login-service.service'

@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component.css']
})
export class FacultyLoginComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService) { }

  ngOnInit() {
    if(Cookie.get("isLoggedIn")=="1")
    this.router.navigate(['postQuestion']);
  }


  uname:string
  password:string
  isLoggedIn:boolean=false

  checkLogin(){
    // validate the user here
    if(this.uname==''||this.password==''){
      alert("Username/Password cannot be empty");
    }
    else{
      var user={
         rollNumber:this.uname,
         password:this.password
       };
     
       
       this.loginService.facultyLogin(user)
       .subscribe(res => {
         console.log(res);
         if(res.result==1){
             this.isLoggedIn=true;
          
        Cookie.set('username', this.uname);
        Cookie.set('isLoggedIn',"1");
 
            window.location.reload();
         this.router.navigate(['postQuestion']);
           }
         else{
           this.isLoggedIn=false;
           alert("Invalid USERNAME/PASSWORD/YEAR!");
    
         }
       })
     }


    }
  }
