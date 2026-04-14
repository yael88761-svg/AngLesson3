import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/question.service';
import { Question } from '../../shared/question';
import { QuestionItemComponent } from '../question-item/question-item.component';
import { CommonModule } from '@angular/common';
import { QuestionsApiService } from '../../shared/questions-api.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, QuestionItemComponent],
  templateUrl: './question-list.component.html'
})
export class QuestionListComponent implements OnInit {
  allQuestions?: Question[] ;

  constructor(
    private readonly svc: QuestionService, // הזרקת השירות
    private readonly realAPI: QuestionsApiService
  ) {
        realAPI.getAllQuestions().subscribe({
      next:( questions) => {
        // כך נרשמים לקבל את התשובה שחוזרת מהשרת בעת הצלחה
        // this.list = cakesList as Cake[];
        this.allQuestions = questions ;
      },
      error: (err) => alert(err.message)
    })

  }
  ngOnInit() {
    this.allQuestions = this.svc.getQuestions();
  }
}