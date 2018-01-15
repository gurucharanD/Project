import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Router} from '@angular/router' 
import {UserAccountService} from './user-account.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  isLoggedIn:boolean= Cookie.get('isStudentLoggedIn')=="1"||Cookie.get('isFacultyLoggedIn')=="1"?true:false;
  user:string =Cookie.get('username');
  title = 'app';

  constructor(private router:Router,private _userAccount:UserAccountService){

  }

  logout(){
    var res=confirm("Any unsaved changes will be lost");
    if(res){
      Cookie.delete('username');
      Cookie.delete('isStudentLoggedIn');
      Cookie.delete('isFacultyLoggedIn');
      Cookie.delete('year');
       window.location.reload();
      this.router.navigate(['login']);
    }
    
  }




}
