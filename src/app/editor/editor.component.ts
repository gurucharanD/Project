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
 output:number[]
  runStatus:string
question:object
langOpt=0;
err

outputResult:boolean = true
showOutput:boolean=false;
sampleResult=false;
  



  constructor(private queService:QueServiceService,private _loginService:LoginService) { 
    this.question=this.queService.getSelectedQuestion();
    
  }

  ngOnInit() {
  }


compile(){
  this.input=this.queService.getInput();
  this.output=this.queService.getOutput();

  if(this.code!=""&&this.lang!=""){

  var code={
    code:this.code,
    lang:parseInt(this.lang),
    input:this.input
  }
 

  this._loginService.compile(code)
  .subscribe(res=>{

      var result = res;
       console.log(res);
      this.err=res;
    
      if(parseInt(res)!=this.output[0]){
        this.outputResult=false;
      }
      else{
        this.sampleResult=true;
      }

      this.showOutput=true;

  });
}
else{
  alert("CODE / LANGUAGE cannot be empty");
}
}



run(){
  this.input=this.queService.getInput();
  this.output=this.queService.getOutput();

  if(this.code!=""&&this.lang!=""){

  var code={
    code:this.code,
    lang:parseInt(this.lang),
    input:this.input
  }
 

  this._loginService.run(code)
  .subscribe(res=>{

      var result = res;
       console.log(res);
      this.err=res;
      for(let i=0;i<res.length;i++)
      {
        if(parseInt(res[i])!=this.output[i]){
          this.outputResult=false;
          break;
        }
      }
      if(this.outputResult)
      this.sampleResult=false;

      this.showOutput=true;

  });
}
else{
  alert("CODE / LANGUAGE cannot be empty");
}
}

}

