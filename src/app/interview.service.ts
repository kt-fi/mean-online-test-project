import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(public http:HttpClient) { }

  getQuestions():Observable<Question[]>{
  return this.http.get<Question[]>("http://localhost:3000/questions"); 
  }
}
