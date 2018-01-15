import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {RegisterService} from '../register.service'
import {FormGroup,
  FormControl,
  Validators,FormBuilder} from '@angular/forms'  

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})

export class RegisterUserComponent implements OnInit {

  form:FormGroup
  public username=new FormControl('');
  public pwdControl = new FormControl('',Validators.required);
  public yearControl=new FormControl('')
  public sectionControl=new FormControl('')



  uname : string 
  password: string
  section:string
  year: string
  isRegistered:boolean


  constructor( private _registerService:RegisterService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {

    this.form=this.fb.group({
      'username':this.username,
      'password':this.pwdControl,
      'year':this.yearControl,
      'section':this.sectionControl
    });

  }

  registerUser(){
    this.uname=this.form.get('username').toString();
    this.password=this.form.get('password').toString();
    this.year=this.form.get('year').toString();
    this.section=this.form.get('section').toString();
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
