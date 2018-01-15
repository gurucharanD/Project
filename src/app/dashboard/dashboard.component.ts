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
  section:string
  answeredQuestions
  displayQuestions:Question[]=[]
  k:number=0


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
    this.displayQuestions=[];

    var query={
      userName:Cookie.get('username')
    }
    this._loginService.getAnsweredQuestions(query)
    .subscribe(res=>{
      this.answeredQuestions=res;
      //console.log(this.answeredQuestions);
      //console.log(this.answeredQuestions.length);
      this.getQuestion();
    });
  }
      
getQuestion(){
  var data={
    week:this.selectedWeek,
    year:Cookie.get("year"),
    section:Cookie.get("section")
  }
  console.log(data);
  this._loginService.getQuestions(data)
  .subscribe(res=>{
   this.questions=res;
   //console.log(this.questions);   
   if(this.questions.length==0)
      this.noQuestions=true;
      else
      {
      this.noQuestions=false;
      Cookie.set('week',this.selectedWeek+"");
      this.showQuestions=true;
        
        if(this.answeredQuestions.length==0)
        {
          this.displayQuestions=this.questions;
        }
        else{
       // console.log(this.questions);
        
          this.calculateArray();

        
      }
      
      
    }
    });
  }
calculateArray(){
  //console.log(this.answeredQuestions[0].marks[0].questionName);
  for(let i=0;i<this.answeredQuestions.length;i++)
  {
    for(let j=0;j<this.questions.length;j++)
    {
      if(this.answeredQuestions[i].marks[i].questionName!=this.questions[j]['name']){
        //console.log(this.answeredQuestions[i].marks['questionName']);
        //console.log(this.questions[j]['name']);
        this.displayQuestions.push(this.questions[j]);
      }
    }
  }
 // console.log(this.displayQuestions);
}
}




  

