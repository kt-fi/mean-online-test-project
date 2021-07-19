import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { Question } from '../question.model';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  // Questions to load if problem with questions.json
  
  q1:Question = new Question( 1, 1, "What is the HTML Element to insert javascript?", "<HTML>", "<script>","<js>","<ts>","option2", false)
  q2:Question = new Question( 2, 2, "What does HTML stand for?","Hyper Text Markup Language","Hyper TypeScript Marketing Line","Henry Top Makeup Line","Hopeful Type Made Loosly", "option1", false)
  q3:Question = new Question( 3, 3, "Where is correct to place <script> tag in HTML?","<head>","<body>","<head> or <body>","<meta>","option3",false)
  q4:Question = new Question( 4, 4, "What is the extension for typescript files?",".js",".ts",".type",".script", "option2", false)
  q5:Question = new Question( 5, 5, "How do you create an alert box in JavaScript?", "alert()", "albert()", "warning()", "alertbox()","option1", false)
  q6:Question = new Question( 6, 6, "What does !true mean?","true","undefined","null","false","option4", false)
  q7:Question = new Question( 7, 7,  "which is the correct IF statement?", "if{1==2}", "if(i=1)then{}", "if(i===1){}", "none of the above","option3", false)
  q8:Question = new Question( 8, 8, "How do we create a click event in TypeScript?","(click)","(clickMe)","[click]","onClick","option1",false)
  q9:Question = new Question( 9, 9,  "What is the larges <H> tag in HTML?","H1","H2","H5","H6","option1", false)
  q10:Question = new Question( 10, 10,  "What does 2 + 2 -1 make?","1","2","3","4","option3", false)

  backupQuestions:any[] = [this.q1, this.q2, this.q3, this.q4, this.q5, this.q6, this.q7, this.q8, this.q9, this.q10]

  constructor(public interviewService:InterviewService, public userService:UserServiceService) { }

  passMessage:string = ""
  questions:any = this.backupQuestions;
  questionNum:number = 0;
  points:number = 0;
  percentage:number = 0;
  showTotal:boolean = false;
  showAnswerValidation:boolean = false
  quizComplete:boolean = false;
  pass?:boolean;


  

  ngOnInit(): void {
   this.interviewService.getQuestions().subscribe(questions=>this.questions = questions); 

   if(!this.questions.length){
    this.questions = this.backupQuestions
   }
  
   
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
        this.passMessage = `Congratulations ${this.username} You have Passed the Test`
      } else {
        this.pass = false;
        this.passMessage = `Sorry ${this.username} You have Failed the Test`
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
