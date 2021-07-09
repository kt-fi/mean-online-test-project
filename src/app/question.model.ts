export class Question {
    constructor(
        public id:number,
        public questionNumber:number,
        public question:string,
        public option1:string, 
        public option2:string, 
        public option3:string, 
        public option4:string, 
        public correctOption:string,
        public correct:boolean
        ){}
}