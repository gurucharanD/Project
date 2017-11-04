import { Component, OnInit } from '@angular/core';
import {QueServiceService} from '../que-service.service'
import { LoginService } from "../login-service.service";


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],

})
export class EditorComponent implements OnInit {

  code:string
 
  lang:string
  compileStatus:string
 input:number[]
  runStatus:string
question:object
langOpt=0;

  //output params

  memoryUsed:string
  output:string
  error:string
  statusDetails:string



  constructor(private queService:QueServiceService,private _loginService:LoginService) { 
    this.question=this.queService.getSelectedQuestion();
    
  }

  ngOnInit() {
  }


run(){
  this.input=this.queService.getInput();

  if(this.code!=""&&this.lang!=""){

  var code={
    code:this.code,
    lang:parseInt(this.lang),
    input:this.input
  }
 

  this._loginService.run(code)
  .subscribe(res=>{
      console.log("output "+res.result);
  });
}
else{
  alert("CODE / LANGUAGE cannot be empty");
}
}

}

