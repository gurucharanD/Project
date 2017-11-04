import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login-service.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})

export class PostQuestionComponent implements OnInit {

  n:number
  selectedYear:number=1
  showTestInputBox:boolean=false;
  questionName:string;
  input=[]
  output=[]
  question:string
  week:number
  arr=[]


  constructor(private _loginService:LoginService,private router:Router) { }

  ngOnInit() {
  }


  testCases(){
    for(var i=0;i<this.n;i++)
    this.arr[i]=i;this.arr[i]=i;
    this.showTestInputBox=true;
  }

  submitQuestion(){
    var newQuestion = {
        name:this.questionName,
        question:this.question,
        week:this.week,
        year:this.selectedYear,
        input:this.input,
        output:this.output
    }
    this._loginService.postQuestion(newQuestion)
    .subscribe(res => {
      
  if(res){
    console.log(res.msg);
    alert("question posted successfully");
  }
  else{
    alert("Failed to post the question");
  }
      
    })
  }

}
