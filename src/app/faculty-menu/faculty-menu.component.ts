import { Component, OnInit,Inject } from '@angular/core';
import {Student} from '../Student'
import {LoginService} from '../login-service.service'
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-faculty-menu',
  templateUrl: './faculty-menu.component.html',
  styleUrls: ['./faculty-menu.component.css'],
  providers:[{provide: 'Window',  useValue: window}]
})
export class FacultyMenuComponent implements OnInit {

  year:number
  week:number
  section:string
  viewMarks:boolean=false
  students:Student[]
  marksScored:number=0

  constructor( @Inject('Window') private window: Window,private _loginService:LoginService) { }

  ngOnInit() {
  }

  getMarks(){
    var data={
      year:this.year,
      week:this.week,
      section:this.section
    }
    this._loginService.getMarks(data)
    .subscribe(res=>{
        console.log(res); 
        this.students=res;
        this.viewMarks=true;
    });
    
  }

  download(){
    var columns=['UserName','Marks'];
    var rows=[];
    this.students.forEach(element => {
      console.log(element);
      
    });
    var doc = new jsPDF();
    
   // doc.save('code.pdf');
  }

}
