import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {LoginService} from '../login-service.service'
import {FormGroup,
  FormControl,
  Validators,
  FormBuilder} from '@angular/forms'  
  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;


  public unameControl=new FormControl('',Validators.required);
  public passwordControl=new FormControl('',Validators.required);
  public yearControl=new FormControl('',Validators.required);
  username:string;
  pwd:string
  isLoggedIn:boolean=false
  year:number
  constructor(private router:Router,private loginService:LoginService,private fb:FormBuilder,private auth:AuthenticationService) {
    
  }

  ngOnInit() {

    if(Cookie.get("isStudentLoggedIn")=="1")
    this.router.navigate(['dashboard']);
    else if(Cookie.get("isFacultyLoggedIn")=="1")
    this.router.navigate(['postQuestion']);

  this.form=this.fb.group({
    'uname':this.unameControl,
    'password':this.passwordControl,
    'year':this.yearControl
  });


  }


  checkLogin(){
    // validate the user here

    if(this.username==''||this.pwd==''){
      alert("Username/Password cannot be empty");
    }
    else{
      var user={
         rollNumber:this.username,
         password:this.pwd,
         year:this.year
       };
     
       //validation part
       this.loginService.isValidUser(user)
       .subscribe(res => {
          //console.log(res);
         if(res.result==1){
             this.isLoggedIn=true;
              this.auth.setStudentLogin(true);
              var userDetails=res.userDetails;
            this.auth.setUserName(userDetails.rollNumber);
            this.auth.setUserYear(userDetails.year);
            this.auth.setSection(userDetails.section);
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
