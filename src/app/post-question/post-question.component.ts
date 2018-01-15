import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login-service.service'
import {Router} from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})

export class PostQuestionComponent implements OnInit {

  n:number
  selectedYear:number=1;
  selectedSection:string="";
  showTestInputBox:boolean=false;
  questionName:string;
  input=[]
  output=[]
  question:string
  week:number
  showDownloadMarks:boolean=false
  arr=[]


  constructor(private _loginService:LoginService,private router:Router) { }

  ngOnInit() {
  }

  //Function which shows current questions for a faculty
  showExistingQuestions(){
    
  }


  testCases(){
    for(var i=0;i<this.n;i++)
    this.arr[i]=i;
    this.showTestInputBox=true;
  }

  submitQuestion(){
    alert("Are you Sure you want to submit ?");
    var newQuestion = {
        name:this.questionName,
        question:this.question,
        week:this.week,
        year:this.selectedYear,
        section:this.selectedSection,
        input:this.input,
        output:this.output,
        postedBy:Cookie.get('username')
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

  showMarksMenu(){
    this.showDownloadMarks=!this.showDownloadMarks;
  }

}
