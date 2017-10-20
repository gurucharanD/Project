import { Component, OnInit } from '@angular/core';
import {QueServiceService} from '../que-service.service'


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],

})
export class EditorComponent implements OnInit {

  question:object
  constructor(private queService:QueServiceService) { 
    this.question=this.queService.getSelectedQuestion();
    
  }

  ngOnInit() {
  }

}
