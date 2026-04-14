import { Injectable } from '@angular/core';
import { Question } from './question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: Question[] = [
    new Question(
      "מהי הפקודה ליצירת פרויקט אנגולר חדש?",
      ["ng start", "ng new", "npm create", "ng build"],
      1,
      "q1"
    ),
    new Question(
      "איזו פקודה מפעילה את שרת הפיתוח?",
      ["ng serve", "ng run", "npm go", "ng dev"],
      0,
      "q2"
    ),
    new Question(
      "באיזו תיקייה נמצאים רכיבי האפליקציה?",
      ["assets", "environments", "src/app", "node_modules"],
      2,
      "q3"
    ),
    new Question(
      "איך יוצרים קומפוננטה חדשה ב-CLI?",
      ["ng add component", "ng make c", "ng generate component", "ng create component"],
      2,
      "q4"
    ),
    new Question(
      "מהו הקובץ האחראי על הגדרות הפרויקט של אנגולר?",
      ["package.json", "angular.json", "tsconfig.json", "index.html"],
      1,
      "q5"
    )
  ];

  constructor() {}
  get Questions(): Question[] {
    return this.questions;
  }

  // add question
  addQuestion(question: Question): Question {
    question.id = crypto.randomUUID();
    this.questions.push(question);
    return question;
  }

  // מחזיר את כל השאלות
  getQuestions(): Question[] {
    return this.questions;
  }

  // מחזיר שאלה ספציפית לפי ID
  getQuestionById(id: string | number): Question | undefined {
    return this.questions.find(q => q.id === id);
  }
}