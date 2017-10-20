import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {QueServiceService} from '../que-service.service'

import { RouterModule, Routes,Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  uname :string
  password:string
  questions=["q1","12","q3"]
  selectedQuestion:object
  isReturned:boolean=false


  constructor(private _cookieService:CookieService,private queService:QueServiceService,private router:Router) { 
    this._cookieService.put('uname',this.uname);
    this._cookieService.put('password',this.password);

  }

  ngOnInit() {
  }

  sendQuestion(question){
  
 this.queService.selectedQuestion(question);
  console.log(question);
    this.router.navigate(['editor']);
  }
  

}
