import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Router} from '@angular/router' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  isLoggedIn:boolean= Cookie.get('isLoggedIn')=="1"?true:false;
  user:string =Cookie.get('username');
  title = 'app';

  constructor(private router:Router){

  }

  logout(){
    Cookie.delete('username');
    Cookie.delete('isLoggedIn');
    Cookie.delete('year');
     window.location.reload();
    this.router.navigate(['login']);
  }




}
