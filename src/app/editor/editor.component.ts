import { Component, OnInit,Inject,OnDestroy  } from '@angular/core';
import {QueServiceService} from '../que-service.service'
import { LoginService } from "../login-service.service";
import * as jsPDF from 'jspdf';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs";
import { RouterModule, Routes,Router } from '@angular/router';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers:[{provide: 'Window',  useValue: window}]

})
export class EditorComponent implements OnInit {

  
  code:string
 tick:string
  lang:string
  compileStatus:string
 input:string[]
 output:string[]
  runStatus:string
question:object
langOpt=0;
time:string
err

outputResult:boolean = true
showOutput:boolean=false;
sampleResult=false;
  
private subscription: Subscription;

timeOfProblem=60;

  constructor( @Inject('Window') private window: Window,private router:Router,private queService:QueServiceService,private _loginService:LoginService) { 
    this.question=this.queService.getSelectedQuestion();
  
    
  }

  ngOnInit() {
    let timer = TimerObservable.create(1000, 1000);
    this.subscription = timer.subscribe(t => {
      var date = new Date(null);
      if(60-t<=0)
      {
        alert("TIME'S UP!");
        this.subscription.unsubscribe();
        this.router.navigate(['dashboard']);
      }
      date.setSeconds(60-t); // specify value for SECONDS here
      var result = date.toISOString().substr(11, 8);
      this.tick = result;
     
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  download() {
    
            var doc = new jsPDF();
            doc.text(20, 20,this.code);
            doc.save('code.pdf');
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
      this.err=res;
      // console.log(typeof res.toString());
      // console.log(typeof this.output[0]);
      // console.log(res);
      // console.log(this.output[0].toString());
      // console.log(res.toString().trim()==this.output[0].toString());
      if(res.toString().trim()!=this.output[0].toString()){
        this.outputResult=false;
        this.sampleResult=false;
      }
      else{
        this.sampleResult=true;
        this.outputResult=true;
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
      this.err=res;
      for(let i=0;i<res.length;i++)
      {
        console.log(typeof res[i].toString());
      console.log(typeof this.output[i]);
      console.log(res);
      console.log(this.output[i].toString());
      console.log(res[i].toString().trim()==this.output[i].toString());
        if(res[i].toString().trim()!=this.output[i].toString()){
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

