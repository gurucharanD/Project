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
  question:object
  lang:string
  compileStatus:string
 
  runStatus:string

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

  compile(){
    var code={
      code:this.code,
      lang:this.lang
    }
    if(this.code!=""&&this.lang!=""){
    this._loginService.compile(code)
    .subscribe(res=>{
        console.log(res);
        this.compileStatus=res.compile_status;
    });
  }
  else{
    alert("CODE / LANGUAGE cannot be empty");
  }
}

run(){
  var code={
    code:this.code,
    lang:this.lang
  }
  if(this.code!=""&&this.lang!=""){
  this._loginService.run(code)
  .subscribe(res=>{
      console.log(res);
      this.output=res.run_status.output;
      this.memoryUsed=res.run_status.memory_used;
      this.statusDetails=res.run_status.status_detail;
      this.error=res.run_status.stderr;
  });
}
else{
  alert("CODE / LANGUAGE cannot be empty");
}
}

}
