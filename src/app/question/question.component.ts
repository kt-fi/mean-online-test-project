import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions:any;
  constructor(public interviewService:InterviewService) { }

  ngOnInit(): void {
    this.interviewService.getQuestions().subscribe(questions=>this.questions = questions); 
  }



}
