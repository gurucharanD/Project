import { Injectable } from '@angular/core';

@Injectable()
export class QueServiceService {

  question:object
  constructor() { }

  selectedQuestion(question){
    this.question=question;
    
  }
getSelectedQuestion(){
  return this.question;
}
}
