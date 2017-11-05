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
  



  constructor(private queService:QueServiceService,private _loginService:LoginService) { 
    this.question=this.queService.getSelectedQuestion();
    
  }

  ngOnInit() {
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

      this.showOutput=true;

  });
}
else{
  alert("CODE / LANGUAGE cannot be empty");
}
}

}

