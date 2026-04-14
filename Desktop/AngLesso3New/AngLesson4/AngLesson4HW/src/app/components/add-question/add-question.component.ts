import { Component, inject } from '@angular/core';
import { QuestionService } from '../../shared/question.service';
import { Question } from '../../shared/question';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  imports: [FormsModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss',
})
export class AddQuestionComponent {

  private readonly _questionService = inject(QuestionService);

newQuestion: Question = 
new Question('', ['', '', '', ''], 0, 0);

  addQuestion() {
    this._questionService.addQuestion(this.newQuestion);
    this.newQuestion = new Question('', ['', '', '', ''], 0, 0);
  }
saveQuestion( ) {
    this._questionService.addQuestion(this.newQuestion);
    this.newQuestion = new Question('', ['', '', '', ''], 0, 0);


 }
}

