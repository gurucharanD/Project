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
  constructor(private queService:QueServiceService,private _loginService:LoginService) { 
    this.question=this.queService.getSelectedQuestion();
    
  }

  ngOnInit() {
  }

  compile(){
    var code={
      code:this.code,
      lang:'C'
    }
    this._loginService.compile(code)
    .subscribe(res=>{
        console.log(res);
    });
  }
}
