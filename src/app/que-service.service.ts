import { Injectable } from '@angular/core';

@Injectable()
export class QueServiceService {

  question:object
  input:number[]

  constructor() { }

  selectedQuestion(question){
    this.question=question;
    this.input=question.input;
    
  }
getSelectedQuestion(){
  return this.question;
}

getInput(){
return this.input;
}
}
