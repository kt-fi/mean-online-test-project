import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public interviewService:InterviewService, public userService:UserServiceService) { }

  questions:any;
  questionNum:number = 0;
  points:number = 0;
  percentage:number = 0;
  showTotal:boolean = false;
  showAnswerValidation:boolean = false
  quizComplete:boolean = false;
  pass?:boolean;

  ngOnInit(): void {
   this.interviewService.getQuestions().subscribe(questions=>this.questions = questions); 
  }

  get username():any{
    return this.userService.username;
  }

  // run on submit form
  questionComplete(questionRef: any, index:number): any {
    let q = this.questions[index];

    if(!questionRef.value.answer){
      this.showAnswerValidation = true;
      return;
    }
     this.markAnswer(questionRef, q);
  }

// mark answer to question as correct or incorrect
  private markAnswer(questionRef: any, q: any) {
    if (questionRef.value.answer === q.correctOption) {
      q.correct = true;
    }
    this.showAnswerValidation = false;
    this.questionNum += 1;
    if(this.questionNum > this.questions.length -1){
      this.checkResults();
    }
  }


// add up correct answers
  checkResults():void{
    for(let i=0; i < this.questions.length; i++){
     if(this.questions[i].correct){
      this.points += 1; 
     }
    }
    this.checkResult();
  }

  // convert result to precentage
  private checkResult() {
    this.percentage = this.points / this.questions.length * 100;
    this.showGrade()
  }

// Display the final result with pass or fail
  private showGrade() {
    if (this.questionNum >= this.questions.length) {
      this.showTotal = true;

      if (this.percentage > 75) {
        this.pass = true;
      } else {
        this.pass = false;
      }
    }
  }

  //Return to last question
  lastQuestion():void{
    this.questionNum -= 1;
  }

  // remove validation warning on radio selectors when selected an option
  selectedAnswer():void{
    this.showAnswerValidation = false;
  }
}
