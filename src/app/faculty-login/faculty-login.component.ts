import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {LoginService} from '../login-service.service'
import {FormGroup,
  FormControl,
  Validators,FormBuilder} from '@angular/forms'  

  
@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component.css']
})
export class FacultyLoginComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService,private fb:FormBuilder) { }

  ngOnInit() {
    if(Cookie.get("isLoggedIn")=="1")
    this.router.navigate(['postQuestion']);

    this.form=this.fb.group({
      'uname':this.unameControl,
      'password':this.passwordControl,
  
    });
  }


  form:FormGroup;


  public unameControl=new FormControl('');
  public passwordControl=new FormControl('',Validators.required);
  username:string;
  pwd:string
  isLoggedIn:boolean=false

  checkLogin(){
    // validate the user here
    this.username=this.form.get('uname').toString();
    this.pwd=this.form.get('password').toString();
    if(this.username==''||this.pwd==''){
      alert("Username/Password cannot be empty");
    }
    else{
      var user={
         rollNumber:this.username,
         password:this.pwd
       };
     
       
       this.loginService.facultyLogin(user)
       .subscribe(res => {
         console.log(res);
         if(res.result==1){
             this.isLoggedIn=true;
          
        Cookie.set('username', this.username);
        Cookie.set('isFacultyLoggedIn',"1");
 
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
