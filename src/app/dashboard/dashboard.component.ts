import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {QueServiceService} from '../que-service.service'
import {LoginService} from '../login-service.service'
import {Question} from '../Question'

import { RouterModule, Routes,Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  uname :string
  password:string
  questions:Question[]
  selectedQuestion:object
  isReturned:boolean=false
  selectedWeek:number
  showQuestions:boolean=false
  selectedYear:number
  noQuestions:boolean=false


  constructor(private queService:QueServiceService,private _loginService:LoginService,private router:Router) { 
   
  
  }

  ngOnInit() {
      
  }




  sendQuestion(question){
  
 this.queService.selectedQuestion(question);
  console.log(question);
    this.router.navigate(['editor']);
  }

  showQuestionForWeek(){
    // this.selectedYear=parseInt(Cookie.get('uname'));
    var data={
      week:this.selectedWeek,
      year:Cookie.get("year")
    }
    this._loginService.getQuestions(data)
    .subscribe(res=>{
        this.questions = res;
        if(this.questions.length==0)
        this.noQuestions=true;
        else
        this.noQuestions=false;
        this.showQuestions=true;
    })
 
   
  }


  

}
